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
const STROKE_THICKNESS = 1;
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
        // console.log("heart rate data", ecgHeartRateArr);
        console.log("XAxis rate data", xArr);
    }
    return {
        xArr,
        ecgHeartRateArr,
    };
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

    // Create LayoutManager and set the rightOuterAxesLayoutStrategy
    if (sciChartSurface.layoutManager) {
        sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy =
            new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
    }

    // Create and add RenderableSeries for each graph
    const dataSeriesArr: XyDataSeries[] = [];
    for (let graphIndex = 0; graphIndex < numGraphs; graphIndex++) {
        const yAxis = new NumericAxis(wasmContext, {
            id: `chart${graphIndex}`,
            visibleRange: new NumberRange(0.7, 1.0),
            isVisible: true,
        });

        // Add yAxis to sciChartSurface one by one using the loop
        sciChartSurface.yAxes.add(yAxis);

        const dataSeries = new XyDataSeries(wasmContext, {
            fifoCapacity: POINTS_LOOP,
            fifoSweeping: true,
            fifoSweepingGap: GAP_POINTS,
        });

        const renderableSeries = new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxis.id,
            strokeThickness: STROKE_THICKNESS,
            dataSeries: dataSeries,
            pointMarker: new EllipsePointMarker(wasmContext, {
                width: 7,
                height: 7,
                strokeThickness: 2,
                lastPointOnly: true,
                stroke: "pink",
            }),
        });

        sciChartSurface.renderableSeries.add(renderableSeries);
        dataSeriesArr.push(dataSeries);
    }

    let currentPoint = 0;

    const runUpdateDataOnTimeout = () => {
        // Get data for each graph
        for (let i = 0; i < numGraphs; i++) {
            const { xArr, ecgHeartRateArr } = getValuesFromData(currentPoint);
            dataSeriesArr[i].appendRange(xArr, ecgHeartRateArr);
        }
        currentPoint += STEP;

        timerId = setTimeout(runUpdateDataOnTimeout, TIMER_TIMEOUT_MS);
    };

    let timerId: number;

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

export default function Chart(numGraphs) {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();
    const controlsRef = React.useRef<{
        handleStart: () => void;
        handleStop: () => void;
    }>();

    React.useEffect(() => {
        const drawMultipleCharts = async () => {
            const { sciChartSurface, controls } = await drawExample(numGraphs);
            sciChartSurfaceRef.current = sciChartSurface;
            controlsRef.current = controls;
            controls.handleStart();
        };

        drawMultipleCharts();

        // Cleanup function
        return () => {
            controlsRef.current?.handleStop();
            sciChartSurfaceRef.current?.delete();
        };
    }, []);

    return (
        <>
            <div
                id={divElementId}
                style={{
                    height: "97vh",
                    width: "97vw",
                    display: "grid",
                    gridTemplateColumns: `1fr ${Array(numGraphs)
                        .fill("auto")
                        .join(" ")} 1fr`,
                    gridGap: "10px",
                }}
            ></div>
        </>
    );
}
