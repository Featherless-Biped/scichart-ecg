import * as React from "react";
import { vitalSignsEcgData } from "./assets/vitalSignsEcgData";
import classes from "./Examples.module.scss";

import {
    CategoryAxis,
    EllipsePointMarker,
    FastLineRenderableSeries,
    NumberRange,
    NumericAxis,
    RightAlignedOuterVerticallyStackedAxisLayoutStrategy,
    SciChartJsNavyTheme,
    SciChartSurface,
    XyDataSeries,
} from "scichart";

const divElementId = "chart";
const STEP = 2_200;
const TIMER_TIMEOUT_MS = 50;
const STROKE_THICKNESS = 1;
const POINTS_LOOP = 44_000 * 5; // 5 seconds
const GAP_POINTS = STEP * 0.02;
const DATA_LENGTH = vitalSignsEcgData.xValues.length; // `5000 points

const {
    ecgHeartRateValues,
    bloodPressureValues,
    bloodVolumeValues,
    bloodOxygenationValues,
} = vitalSignsEcgData;

// HELPER FUNCTIONS
const getValuesFromData = (xIndex: number) => {
    const xArr: number[] = [];
    const ecgHeartRateArr: number[] = [];
    const bloodPressureArr: number[] = [];
    const bloodVolumeArr: number[] = [];
    const bloodOxygenationArr: number[] = [];
    for (let i = 0; i < STEP; i++) {
        const dataIndex = (xIndex + i) % DATA_LENGTH;
        const x = xIndex + i;
        xArr.push(x);
        ecgHeartRateArr.push(ecgHeartRateValues[dataIndex]);
        bloodPressureArr.push(bloodPressureValues[dataIndex]);
        bloodVolumeArr.push(bloodVolumeValues[dataIndex]);
        bloodOxygenationArr.push(bloodOxygenationValues[dataIndex]);
    }
    return {
        xArr,
        ecgHeartRateArr,
        bloodPressureArr,
        bloodVolumeArr,
        bloodOxygenationArr,
    };
};

// SCICHART
const drawExample = async (
    setInfoEcg: React.Dispatch<React.SetStateAction<number>>,
    setInfoBloodPressure1: React.Dispatch<React.SetStateAction<number>>,
    setInfoBloodPressure2: React.Dispatch<React.SetStateAction<number>>,
    setInfoBloodVolume: React.Dispatch<React.SetStateAction<number>>,
    setInfoBloodOxygenation: React.Dispatch<React.SetStateAction<number>>
) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId,
        {
            theme: new SciChartJsNavyTheme(),
        }
    );

    // Create a single, shared X-axis, pre-sized to fit the data in X, and is invisible

    // Note: For fifoSweeping mode to work, the X-Axis must be a CategoryAxis
    //      NumericAxis is also supported, but x-values must then be offsets from 0, ie do x % fifoCapacity.
    //      See more info in the docs
    const xAxis = new CategoryAxis(wasmContext, {
        visibleRange: new NumberRange(0, POINTS_LOOP),
        isVisible: false,
    });
    sciChartSurface.xAxes.add(xAxis);

    // Create multiple y-axis, one per trace. Using the stacked vertically layout strategy
    const yAxisHeartRate = new NumericAxis(wasmContext, {
        id: "yHeartRate",
        visibleRange: new NumberRange(0.7, 1.0),
        isVisible: true,
    });
    const yAxisBloodPressure = new NumericAxis(wasmContext, {
        id: "yBloodPressure",
        visibleRange: new NumberRange(0.4, 0.8),
        isVisible: true,
    });
    const yAxisBloodVolume = new NumericAxis(wasmContext, {
        id: "yBloodVolume",
        visibleRange: new NumberRange(0.1, 0.5),
        isVisible: true,
    });
    const yAxisBloodOxygenation = new NumericAxis(wasmContext, {
        id: "yBloodOxygenation",
        visibleRange: new NumberRange(0, 0.2),
        isVisible: true,
    });

    sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy =
        new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
    sciChartSurface.yAxes.add(
        yAxisHeartRate,
        yAxisBloodPressure,
        yAxisBloodVolume,
        yAxisBloodOxygenation
    );

    // Using the NEW fifoCapacity, fifoSweeping mode in SciChart.js v3.2 we specify a number of points
    // we want in the viewport. When the right edge of the viewport is reached, the series wraps around

    const fifoSweepingGap = GAP_POINTS;
    const dataSeries1 = new XyDataSeries(wasmContext, {
        fifoCapacity: POINTS_LOOP,
        fifoSweeping: true,
        fifoSweepingGap,
    });
    const dataSeries2 = new XyDataSeries(wasmContext, {
        fifoCapacity: POINTS_LOOP,
        fifoSweeping: true,
        fifoSweepingGap,
    });
    const dataSeries3 = new XyDataSeries(wasmContext, {
        fifoCapacity: POINTS_LOOP,
        fifoSweeping: true,
        fifoSweepingGap,
    });
    const dataSeries4 = new XyDataSeries(wasmContext, {
        fifoCapacity: POINTS_LOOP,
        fifoSweeping: true,
        fifoSweepingGap,
    });

    // A pointmarker with lastPointOnly = true will be used for all series to mark the last point
    const pointMarkerOptions = {
        width: 7,
        height: 7,
        strokeThickness: 2,
        lastPointOnly: true,
    };

    // Create four RenderableSeries which render the data
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxisHeartRate.id,
            strokeThickness: STROKE_THICKNESS,
            dataSeries: dataSeries1,
            pointMarker: new EllipsePointMarker(wasmContext, {
                ...pointMarkerOptions,
                stroke: "pink",
            }),
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxisBloodPressure.id,
            strokeThickness: STROKE_THICKNESS,
            // stroke: appTheme.VividSkyBlue,
            dataSeries: dataSeries2,
            pointMarker: new EllipsePointMarker(wasmContext, {
                ...pointMarkerOptions,
                stroke: "pink",
            }),
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxisBloodVolume.id,
            strokeThickness: STROKE_THICKNESS,
            // stroke: appTheme.VividPink,
            dataSeries: dataSeries3,
            pointMarker: new EllipsePointMarker(wasmContext, {
                ...pointMarkerOptions,
                stroke: "pink",
            }),
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxisBloodOxygenation.id,
            strokeThickness: STROKE_THICKNESS,
            // stroke: appTheme.VividTeal,
            dataSeries: dataSeries4,
            pointMarker: new EllipsePointMarker(wasmContext, {
                ...pointMarkerOptions,
                stroke: "pink",
            }),
        })
    );

    let timerId: number;

    // The following code is run once per timer-step to update the data in the charts
    // Here you would subsitute your own callback to receive data from your data feed or sensors
    const runUpdateDataOnTimeout = () => {
        // Get data
        const {
            xArr,
            ecgHeartRateArr,
            bloodPressureArr,
            bloodVolumeArr,
            bloodOxygenationArr,
        } = getValuesFromData(currentPoint);
        currentPoint += STEP;

        // appendRange when fifoSweepingMode = true and fifoCapacity is reached will cause the series to wrap around
        dataSeries1.appendRange(xArr, ecgHeartRateArr);
        dataSeries2.appendRange(xArr, bloodPressureArr);
        dataSeries3.appendRange(xArr, bloodVolumeArr);
        dataSeries4.appendRange(xArr, bloodOxygenationArr);

        // Update Info panel
        if (currentPoint % 1000 === 0) {
            const ecg = ecgHeartRateArr[STEP - 1];
            setInfoEcg(Math.floor(ecg * 20));
            const bloodPressure = bloodPressureArr[STEP - 1];
            setInfoBloodPressure1(Math.floor(bloodPressure * 46));
            setInfoBloodPressure2(Math.floor(bloodPressure * 31));
            const bloodVolume = bloodVolumeArr[STEP - 1] + 3;
            setInfoBloodVolume(bloodVolume + 8.6);
            const bloodOxygenation = bloodOxygenationArr[STEP - 1];
            setInfoBloodOxygenation(Math.floor(bloodOxygenation * 10 + 93));
        }
        timerId = setTimeout(runUpdateDataOnTimeout, TIMER_TIMEOUT_MS);
    };

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

// REACT COMPONENT
export default function VitalSignsMonitorDemo() {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();
    const controlsRef = React.useRef<{
        handleStart: () => void;
        handleStop: () => void;
    }>();

    const [infoEcg, setInfoEcg] = React.useState<number>(0);
    const [infoBloodPressure1, setInfoBloodPressure1] =
        React.useState<number>(0);
    const [infoBloodPressure2, setInfoBloodPressure2] =
        React.useState<number>(0);
    const [infoBloodVolume, setInfoBloodVolume] = React.useState<number>(0);
    const [infoBloodOxygenation, setInfoBloodOxygenation] =
        React.useState<number>(0);

    React.useEffect(() => {
        let autoStartTimerId: number;

        const chartInitialization = async () => {
            const res = await drawExample(
                setInfoEcg,
                setInfoBloodPressure1,
                setInfoBloodPressure2,
                setInfoBloodVolume,
                setInfoBloodOxygenation
            );
            sciChartSurfaceRef.current = res.sciChartSurface;
            controlsRef.current = res.controls;
            autoStartTimerId = setTimeout(res.controls.handleStart, 0);
            return res;
        };
        const chartInitializationPromise = chartInitialization();
        // Delete sciChartSurface on unmount component to prevent memory leak
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
            <div
                id={divElementId}
                style={{ height: "97dvh", width: "97dvw" }}
            />
        </>
    );
}
