import { Alert, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ApexChart } from "../../ApexChart";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { defineTranslations } from "../../../translations/translate";
import { format } from "date-fns";
import { useContext } from "react";

const t = defineTranslations(
  {
    header: {
      en: "7-day temperature prediction",
      cs: "Předpověď teplot v příštích 7 dnech",
    },
    noData: {
      en: "There's no data for selected location",
      cs: "Pro zvolenou lokaci nejsou dostupná žádná data.",
    },
    morning: {
      en: "Morning",
      cs: "Ráno",
    },
    day: {
      en: "Day",
      cs: "Dopoledne",
    },
    evening: {
      en: "Evening",
      cs: "Odpoledne",
    },
    night: {
      en: "Night",
      cs: "Večer",
    },
  },
  "graphView.dailyTemps"
);

export const DailyTempsView = () => {
  const { data } = useContext(WeatherContext);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack width="100%" alignItems="center">
      <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
        {t.translate.header()}
      </Typography>

      {data?.daily ? (
        <ApexChart
          id="daily-temps"
          type="bar"
          options={{
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: (value) => value + " °C",
              },
            },
            plotOptions: {
              bar: {
                horizontal: small,
                borderRadius: 4,
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
              name: t.translate.morning(),
              data: [...data.daily.map((h) => h.temp.morn)],
            },
            {
              name: t.translate.day(),
              data: [...data.daily.map((h) => h.temp.day)],
            },
            {
              name: t.translate.evening(),
              data: [...data.daily.map((h) => h.temp.eve)],
            },
            {
              name: t.translate.night(),
              data: [...data.daily.map((h) => h.temp.night)],
            },
          ]}
        />
      ) : (
        <Alert severity="warning">{t.translate.noData()}</Alert>
      )}
    </Stack>
  );
};
