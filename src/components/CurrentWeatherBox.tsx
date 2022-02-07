import { Stack, Typography, styled } from "@mui/material";
import { defineTranslations } from "../translations/translate";
import AirIcon from "@mui/icons-material/Air";
import Image from "next/image";
import React from "react";

const t = defineTranslations(
  {
    noLocation: {
      en: "No location selected",
      cs: "Nebyla zvolena žádná lokace",
    },
    locationData: {
      en: "Location search data",
      cs: "Data vyhledávání pozice",
    },
  },
  "currentWeatherBox"
);

const WeatherBoxWrapper = styled(Stack)((p) => ({
  backgroundColor: "#ffffff10",
  borderRadius: p.theme.spacing(1),
  padding: p.theme.spacing(2, 3),
  marginBlock: p.theme.spacing(2),
  "& > *": {
    width: "100%",
  },
  alignItems: "center",
  justifyContent: "space-evenly",
}));

export const CurrentWeatherBox = React.memo(
  (props: { location: string; weatherData?: any; smallBreakpoint: boolean }) => {
    return (
      <WeatherBoxWrapper
        width={props.smallBreakpoint ? "90%" : "21rem"}
        height={props.smallBreakpoint ? "auto" : "10rem"}
      >
        {!props.weatherData?.current ? (
          <Typography textAlign="center" suppressHydrationWarning>
            {t.translate.noLocation()}
          </Typography>
        ) : (
          <>
            <Stack
              direction={props.smallBreakpoint ? "column" : "row"}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>{props.location}</Typography>
              <Typography fontSize="1.3rem" fontWeight="bold">
                {props.weatherData.current.temp + "\u00a0" + "°C"}
              </Typography>
            </Stack>
            <Stack
              direction={props.smallBreakpoint ? "column" : "row"}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Image
                  loading="lazy"
                  width="75"
                  height="75"
                  src={`http://openweathermap.org/img/wn/${props.weatherData.current.weather[0].icon}@2x.png`}
                  alt={props.weatherData.current.weather[0].description}
                  title={props.weatherData.current.weather[0].description}
                />
                <Typography fontSize="1.3rem">
                  {props.weatherData.current.weather[0].main}
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                title={(props.weatherData.current.wind_speed * 3.6).toPrecision(3) + " km/h"}
              >
                <AirIcon fontSize="large" />
                <Typography>{props.weatherData.current.wind_speed + "\u00a0" + "m/s"}</Typography>
              </Stack>
            </Stack>
          </>
        )}
      </WeatherBoxWrapper>
    );
  }
);
