import { Alert, Stack, Typography } from "@mui/material";
import { ApexChart } from "../../ApexChart";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { defineTranslations } from "../../../translations/translate";
import { format } from "date-fns";
import { useContext } from "react";

const t = defineTranslations(
  {
    header: {
      en: "7-day High/Low prediction",
      cs: "Předpověď High/Low v příštích 7 dnech",
    },
    noData: {
      en: "There's no data for selected location",
      cs: "Pro zvolenou lokaci nejsou dostupná žádná data.",
    },
  },
  "graphView.dailyHighLow"
);

export const DailyHighLowView = () => {
  const { data } = useContext(WeatherContext);
  return (
    <Stack width="100%" alignItems="center">
      <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
        {t.translate.header()}
      </Typography>

      {data?.daily ? (
        <ApexChart
          id="daily-high-low"
          type="line"
          options={{
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: (value) => value + " °C",
              },
            },
            xaxis: {
              categories: [...data.daily.map((h) => format(new Date(h.dt * 1000), "EEE dd.MM."))],
            },
            yaxis: {
              labels: {
                formatter: (value) => value + " °C",
              },
            },
          }}
          series={[
            {
              name: "High",
              data: [...data.daily.map((h) => h.temp.max)],
            },
            {
              name: "Low",
              data: [...data.daily.map((h) => h.temp.min)],
            },
          ]}
        />
      ) : (
        <Alert severity="warning">{t.translate.noData()}</Alert>
      )}
    </Stack>
  );
};
