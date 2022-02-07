import { Alert, Grid, Stack, Typography, styled } from "@mui/material";
import { WeatherContext } from "../../contexts/WeatherContext";
import { defineTranslations } from "../../translations/translate";
import { format } from "date-fns";
import { useContext } from "react";

const t = defineTranslations(
  {
    header: {
      en: "Current weather details",
      cs: "Aktuální detail počasí",
    },
    noData: {
      en: "There's no data for selected location",
      cs: "Pro zvolenou lokaci nejsou dostupná žádná data.",
    },
    temperature: {
      en: "Temperature: ",
      cs: "Teplota: ",
    },
    feelsLike: {
      en: "Feels line: ",
      cs: "Pocitová Teplota: ",
    },
    cloudiness: {
      en: "Cloudiness: ",
      cs: "Zamračenost: ",
    },
    uvIndex: {
      en: "UV index: ",
      cs: "UV index: ",
    },
    sunrise: {
      en: "Sunrise: ",
      cs: "Východ slunce: ",
    },
    sunset: {
      en: "Sunrise: ",
      cs: "Západ slunce: ",
    },
    humidity: {
      en: "Humidity: ",
      cs: "Vlhkost: ",
    },
    pressure: {
      en: "Pressure: ",
      cs: "Tlak: ",
    },
  },
  "weatherDetails"
);

const Span_bold = styled("span")((p) => ({
  fontWeight: p.theme.typography.fontWeightBold,
}));

export const WeatherDetails = () => {
  const { data } = useContext(WeatherContext);

  return (
    <Stack width="100%" alignItems="center">
      <Typography variant="h4" mb="1rem" mt="1rem" textAlign="center">
        {t.translate.header()}
      </Typography>

      {data?.hourly ? (
        <Grid container width="100%" sx={{ "& *": { fontSize: "1.3rem" } }}>
          <Grid item md={6} sm={12} xs={12}>
            <Stack alignItems="center">
              <Typography>
                <Span_bold>{t.translate.temperature()}</Span_bold>
                {data.current.temp}°C
              </Typography>
              <Typography>
                <Span_bold>{t.translate.feelsLike()}</Span_bold>
                {data.current.feels_like}°C
              </Typography>
              <Typography>
                <Span_bold>{t.translate.cloudiness()}</Span_bold>
                {data.current.clouds}%
              </Typography>
              <Typography>
                <Span_bold>{t.translate.uvIndex()}</Span_bold>
                {data.current.uvi}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Stack alignItems="center">
              <Typography>
                <Span_bold>{t.translate.sunrise()}</Span_bold>
                {format(data.current.sunrise * 1000, "HH:mm")}
              </Typography>
              <Typography>
                <Span_bold>{t.translate.sunset()}</Span_bold>
                {format(data.current.sunset * 1000, "HH:mm")}
              </Typography>
              <Typography>
                <Span_bold>{t.translate.humidity()}</Span_bold>
                {data.current.humidity}%
              </Typography>
              <Typography>
                <Span_bold>{t.translate.pressure()}</Span_bold>
                {data.current.pressure} hPa
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="warning">{t.translate.noData()}</Alert>
      )}
    </Stack>
  );
};
