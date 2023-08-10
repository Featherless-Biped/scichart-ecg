import * as React from "react";
import {
    SciChartSurface,
    NumberRange,
    CategoryAxis,
    SciChartJSDarkv2Theme,
    NumericAxis,
    RightAlignedOuterVerticallyStackedAxisLayoutStrategy,
    XyDataSeries,
    FastLineRenderableSeries,
    EllipsePointMarker,
} from "scichart";
import { vitalSignsEcgData } from "../assets/vitalSignsEcgData";
const divElementId = "chart";
const STEP = 2_200;
const TIMER_TIMEOUT_MS = 50;
const POINTS_LOOP = 44_000 * 5; // 5 seconds
const GAP_POINTS = STEP * 0.02;
const DATA_LENGTH = vitalSignsEcgData.xValues.length; // `5000 points

const { ecgHeartRateValues } = vitalSignsEcgData;

const getValuesFromData = (xIndex: number) => {
    const xArr: number[] = [];
    const ecgHeartRateArr: number[] = [];

    for (let i = 0; i < STEP; i++) {
        const dataIndex = (xIndex + i) % DATA_LENGTH;
        const x = xIndex + i;
        xArr.push(x);
        ecgHeartRateArr.push(ecgHeartRateValues[dataIndex]);
    }
    return {
        xArr,
        ecgHeartRateArr,
    };
};
// Function which creates YAxis's
const generateYAxisObjects = (count, wasmContext) => {
    const yAxisObjects = [];
    for (let i = 1; i <= count; i++) {
        const yAxisId = `yAxis${i}`;
        const visibleRangeStart = (i - 1) * 0.1;
        const visibleRangeEnd = i * 0.1;
        const yAxis = new NumericAxis(wasmContext, {
            id: yAxisId,
            visibleRange: new NumberRange(visibleRangeStart, visibleRangeEnd),
            isVisible: true,
        });
        yAxisObjects.push(yAxis);
    }
    return yAxisObjects;
};

const addRenderableSeriesWithDynamicYAxis = (
    wasmContext,
    sciChartSurface,
    yAxisObjects,
    dataSeries,
    number
) => {
    const STROKE_THICKNESS = 2;
    const pointMarkerOptions = {
        width: 1,
        height: 1,
        strokeThickness: 2,
        // fill: "blue",
        stroke: "blue",
    };

    // Ensure the number is within the range of yAxisObjects
    if (number > 0 && number <= yAxisObjects.length) {
        const yAxis = yAxisObjects[number - 1]; // Arrays are 0-indexed, while number starts from 1
        sciChartSurface.renderableSeries.add(
            new FastLineRenderableSeries(wasmContext, {
                yAxisId: yAxis.id,
                strokeThickness: STROKE_THICKNESS,
                dataSeries,
                pointMarker: new EllipsePointMarker(wasmContext, {
                    ...pointMarkerOptions,
                    // stroke: "pink",
                }),
            })
        );
    } else {
        console.error(`Invalid number: ${number}`);
    }
};

const drawExample = async (numGraphs: number) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId,
        {
            theme: new SciChartJSDarkv2Theme(),
        }
    );

    // Create shared X-axis
    const xAxis = new CategoryAxis(wasmContext, {
        visibleRange: new NumberRange(0, POINTS_LOOP),
        isVisible: false,
    });
    sciChartSurface.xAxes.add(xAxis);
    const yAxes = generateYAxisObjects(numGraphs, wasmContext);
    // Create LayoutManager and set the rightOuterAxesLayoutStrategy
    if (sciChartSurface.layoutManager) {
        sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy =
            new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
    }
    sciChartSurface.yAxes.add(...yAxes);
    const fifoSweepingGap = GAP_POINTS;
    const dataSeries = new XyDataSeries(wasmContext, {
        fifoCapacity: POINTS_LOOP,
        fifoSweeping: true,
        fifoSweepingGap,
    });

    const dataSeriesArray = []; // Array to hold the data series for each graph
    for (let i = 0; i < numGraphs; i++) {
        const fifoSweepingGap = GAP_POINTS;
        const dataSeries = new XyDataSeries(wasmContext, {
            fifoCapacity: POINTS_LOOP,
            fifoSweeping: true,
            fifoSweepingGap,
        });
        dataSeriesArray.push(dataSeries); // Push the data series to the array
        for (let i = 0; i < numGraphs; i++) {
            addRenderableSeriesWithDynamicYAxis(
                wasmContext,
                sciChartSurface,
                yAxes,
                dataSeries,
                i + 1
            );
        }
    }

    let timerId: number;
    const runUpdateDataOnTimeout = () => {
        const { xArr, ecgHeartRateArr } = getValuesFromData(currentPoint);
        currentPoint += STEP;

        for (let i = 0; i < numGraphs; i++) {
            const startIndex = i * STEP;
            const endIndex = startIndex + STEP;
            const xData = xArr.slice(startIndex, endIndex);
            const yData = ecgHeartRateArr.slice(startIndex, endIndex);
            dataSeriesArray[i].appendRange(xData, yData);
        }

        timerId = setTimeout(runUpdateDataOnTimeout, TIMER_TIMEOUT_MS);
    };
    // ZoomExtents() to show all graphs horizontally
    sciChartSurface.zoomExtents();

    // ZoomExtentsY() to show all graphs vertically
    sciChartSurface.zoomExtentsY();
    const handleStop = () => {
        clearTimeout(timerId);
    };

    const handleStart = () => {
        if (timerId) {
            handleStop();
        }
        runUpdateDataOnTimeout();
    };

    return {
        sciChartSurface,
        wasmContext,
        controls: { handleStart, handleStop },
    };
};

let currentPoint = 0;

export default function Chart({ numGraphs }: { numGraphs: number }) {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();
    const controlsRef = React.useRef<{
        handleStart: () => void;
        handleStop: () => void;
    }>();

    React.useEffect(() => {
        let autoStartTimerId: number;
        const chartInitialization = async () => {
            const res = await drawExample(numGraphs);
            sciChartSurfaceRef.current = res.sciChartSurface;
            controlsRef.current = res.controls;
            autoStartTimerId = setTimeout(res.controls.handleStart, 0);
            return res;
        };
        const chartInitializationPromise = chartInitialization();
        return () => {
            // // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                clearTimeout(autoStartTimerId);
                controlsRef.current!.handleStop();
                sciChartSurfaceRef.current.delete();
                return;
            }

            // else postpone deletion
            (async () => {
                await chartInitializationPromise;
                clearTimeout(autoStartTimerId);
                controlsRef.current!.handleStop();
                sciChartSurfaceRef.current!.delete();
                return;
            })();
        };
    }, []);

    return (
        <>
            <div id={divElementId}></div>
        </>
    );
}
