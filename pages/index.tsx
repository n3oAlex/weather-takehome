import { CurrentWeatherBox } from "../src/components/CurrentWeatherBox";
import { MainLayout } from "../src/components/Layout/MainLayout";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { ViewSwitch } from "../src/components/ViewSwitch";
import { WeatherContext } from "../src/contexts/WeatherContext";
import { useContext } from "react";
import LocationSelect from "../src/components/LocationSelect";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, locationName } = useContext(WeatherContext);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainLayout>
      <Stack alignItems="center" gap="1rem" pt="1rem">
        <Stack
          direction={small ? "column" : "row"}
          alignItems="center"
          justifyContent="space-evenly"
          width="100%"
        >
          <LocationSelect />
          <CurrentWeatherBox location={locationName} weatherData={data} smallBreakpoint={small} />
        </Stack>
        <ViewSwitch />
      </Stack>
    </MainLayout>
  );
};

export default Home;
