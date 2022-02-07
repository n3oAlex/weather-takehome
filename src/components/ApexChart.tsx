import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ApexChartProps = {
  id: string;
  type:
    | "area"
    | "line"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar";
  series: any[];
  options?: ApexCharts.ApexOptions;
};

export const ApexChart = React.memo((props: ApexChartProps) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      sx={{
        width: "90%",
        aspectRatio: small ? "unset" : "16 / 9",
        maxHeight: "60vh",
      }}
    >
      <Chart
        id={props.id}
        type={props.type}
        series={props.series}
        options={{
          ...props.options,
          chart: {
            ...props.options?.chart,
            id: props.id,
            foreColor: "#85a3b7",
            background: "#111729",
          },
          tooltip: {
            ...props.options?.tooltip,
            theme: "dark",
          },
          dataLabels: {
            ...props.options?.dataLabels,
            enabled: false,
          },
        }}
      />
    </Stack>
  );
});
