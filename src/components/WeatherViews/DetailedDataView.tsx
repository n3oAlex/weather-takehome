import { Grid, Stack, Typography } from "@mui/material";
import { WeatherContext } from "../../contexts/WeatherContext";
import { defineTranslations } from "../../translations/translate";
import { useContext } from "react";

const t = defineTranslations(
  {
    weatherData: {
      en: "Weather API data",
      cs: "API data o počasí",
    },
    locationData: {
      en: "Location search data",
      cs: "Data vyhledávání pozice",
    },
  },
  "graphView.dataView"
);

export const DetailedDataView = () => {
  const { data, options } = useContext(WeatherContext);
  return (
    <Grid container>
      <Grid item md={6} sm={12} width="100%">
        <Stack alignItems="center">
          <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
            {t.translate.weatherData()}
          </Typography>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Stack>
      </Grid>
      <Grid item md={6} sm={12} width="100%">
        <Stack alignItems="center">
          <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
            {t.translate.locationData()}
          </Typography>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(options, null, 2)}
          </pre>
        </Stack>
      </Grid>
    </Grid>
  );
};
