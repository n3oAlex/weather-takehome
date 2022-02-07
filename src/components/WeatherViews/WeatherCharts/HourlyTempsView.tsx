import { Alert, Stack, Typography } from "@mui/material";
import { ApexChart } from "../../ApexChart";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { defineTranslations } from "../../../translations/translate";
import { useContext } from "react";

const t = defineTranslations(
  {
    header: {
      en: "48-hour temperature prediction",
      cs: "Předpověď teplot v příštích 48 hodinách",
    },
    noData: {
      en: "There's no data for selected location",
      cs: "Pro zvolenou lokaci nejsou dostupná žádná data.",
    },
    temperature: {
      en: "Temperature",
      cs: "Teplota",
    },
  },
  "graphView.hourlyTemps"
);

export const HourlyTempsView = () => {
  const { data } = useContext(WeatherContext);
  return (
    <Stack width="100%" alignItems="center">
      <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
        {t.translate.header()}
      </Typography>

      {data?.hourly ? (
        <ApexChart
          id="hourly-temps"
          type="area"
          options={{
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: (value) => value + " °C",
              },
              x: {
                format: "dd MMM yyyy",
              },
            },
            xaxis: {
              type: "datetime",
              tickAmount: 6,
            },
            yaxis: {
              labels: {
                formatter: (value) => value + " °C",
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "vertical",
                shadeIntensity: 0.8,
                opacityFrom: 0.9,
                opacityTo: 0.1,
                stops: [0, 100],
                inverseColors: false,
              },
            },
          }}
          series={[
            {
              name: t.translate.temperature(),
              data: [...data.hourly.map((h) => [h.dt * 1000, h.temp])],
            },
          ]}
        />
      ) : (
        <Alert severity="warning">{t.translate.noData()}</Alert>
      )}
    </Stack>
  );
};
