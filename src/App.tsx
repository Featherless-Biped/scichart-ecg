import * as React from "react";
import { vitalSignsEcgData } from "./assets/vitalSignsEcgData";

import {
  CategoryAxis,
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
const drawExample = async () => {
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

  const yAxisHeartRate2 = new NumericAxis(wasmContext, {
    id: "yHeartRate2",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure2 = new NumericAxis(wasmContext, {
    id: "yBloodPressure2",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume2 = new NumericAxis(wasmContext, {
    id: "yBloodVolume2",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation2 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation2",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });

  const yAxisHeartRate3 = new NumericAxis(wasmContext, {
    id: "yHeartRate3",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure3 = new NumericAxis(wasmContext, {
    id: "yBloodPressure3",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume3 = new NumericAxis(wasmContext, {
    id: "yBloodVolume3",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation3 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation3",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });



  const yAxisHeartRate4 = new NumericAxis(wasmContext, {
    id: "yHeartRate4",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure4 = new NumericAxis(wasmContext, {
    id: "yBloodPressure4",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume4 = new NumericAxis(wasmContext, {
    id: "yBloodVolume4",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation4 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation4",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });



  const yAxisHeartRate5 = new NumericAxis(wasmContext, {
    id: "yHeartRate5",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure5 = new NumericAxis(wasmContext, {
    id: "yBloodPressure5",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume5 = new NumericAxis(wasmContext, {
    id: "yBloodVolume5",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation5 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation5",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });




  const yAxisHeartRate6 = new NumericAxis(wasmContext, {
    id: "yHeartRate6",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure6 = new NumericAxis(wasmContext, {
    id: "yBloodPressure6",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume6 = new NumericAxis(wasmContext, {
    id: "yBloodVolume6",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation6 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation6",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });




  const yAxisHeartRate7 = new NumericAxis(wasmContext, {
    id: "yHeartRate7",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure7 = new NumericAxis(wasmContext, {
    id: "yBloodPressure7",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume7 = new NumericAxis(wasmContext, {
    id: "yBloodVolume7",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation7 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation7",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });





  const yAxisHeartRate8 = new NumericAxis(wasmContext, {
    id: "yHeartRate8",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure8 = new NumericAxis(wasmContext, {
    id: "yBloodPressure8",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume8 = new NumericAxis(wasmContext, {
    id: "yBloodVolume8",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation8 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation8",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });





  const yAxisHeartRate9 = new NumericAxis(wasmContext, {
    id: "yHeartRate9",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure9 = new NumericAxis(wasmContext, {
    id: "yBloodPressure9",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume9 = new NumericAxis(wasmContext, {
    id: "yBloodVolume9",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation9 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation9",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });

  const yAxisHeartRate10 = new NumericAxis(wasmContext, {
    id: "yHeartRate10",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure10 = new NumericAxis(wasmContext, {
    id: "yBloodPressure10",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume10 = new NumericAxis(wasmContext, {
    id: "yBloodVolume10",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation10 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation10",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });


  const yAxisHeartRate11 = new NumericAxis(wasmContext, {
    id: "yHeartRate11",
    visibleRange: new NumberRange(0.7, 1.0),
    isVisible: true,
  });
  const yAxisBloodPressure11 = new NumericAxis(wasmContext, {
    id: "yBloodPressure11",
    visibleRange: new NumberRange(0.4, 0.8),
    isVisible: true,
  });
  const yAxisBloodVolume11 = new NumericAxis(wasmContext, {
    id: "yBloodVolume11",
    visibleRange: new NumberRange(0.1, 0.5),
    isVisible: true,
  });
  const yAxisBloodOxygenation11 = new NumericAxis(wasmContext, {
    id: "yBloodOxygenation11",
    visibleRange: new NumberRange(0, 0.2),
    isVisible: true,
  });

  sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy =
    new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
  sciChartSurface.yAxes.add(
    yAxisHeartRate,
    yAxisBloodPressure,
    yAxisBloodVolume,
    yAxisBloodOxygenation,
    yAxisHeartRate2,
    yAxisBloodPressure2,
    yAxisBloodVolume2,
    yAxisBloodOxygenation2,
    yAxisHeartRate3,
    yAxisBloodPressure3,
    yAxisBloodVolume3,
    yAxisBloodOxygenation3,
    yAxisHeartRate4,
    yAxisBloodPressure4,
    yAxisBloodVolume4,
    yAxisBloodOxygenation4,
    yAxisHeartRate5,
    yAxisBloodPressure5,
    yAxisBloodVolume5,
    yAxisBloodOxygenation5,
    yAxisHeartRate6,
    yAxisBloodPressure6,
    yAxisBloodVolume6,
    yAxisBloodOxygenation6,

    yAxisHeartRate7,
    yAxisBloodPressure7,
    yAxisBloodVolume7,
    yAxisBloodOxygenation7,

    yAxisHeartRate8,
    yAxisBloodPressure8,
    yAxisBloodVolume8,
    yAxisBloodOxygenation8,

    yAxisHeartRate9,
    yAxisBloodPressure9,
    yAxisBloodVolume9,
    yAxisBloodOxygenation9,


    yAxisHeartRate10,
    yAxisBloodPressure10,
    yAxisBloodVolume10,
    yAxisBloodOxygenation10,

    yAxisHeartRate11,
    yAxisBloodPressure11,
    yAxisBloodVolume11,
    yAxisBloodOxygenation11,
    
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

  // Create four RenderableSeries which render the data
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate2.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure2.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume2.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation2.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate3.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure3.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume3.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation3.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );


  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate4.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure4.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume4.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation4.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );




  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );



  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation5.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );





  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate6.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure6.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume6.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation6.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );





  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate7.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure7.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume7.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation7.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );






  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate8.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure8.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume8.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation8.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );





  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate9.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure9.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume9.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation9.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );





  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate10.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure10.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume10.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation10.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisHeartRate11.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries1,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodPressure11.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries2,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodVolume11.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries3,
    })
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      yAxisId: yAxisBloodOxygenation11.id,
      strokeThickness: STROKE_THICKNESS,
      dataSeries: dataSeries4,
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

  React.useEffect(() => {
    let autoStartTimerId: number;

    const chartInitialization = async () => {
      const res = await drawExample();
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
      <div id={divElementId} style={{ height: "96dvh", width: "97dvw" }} />
    </>
  );
}
