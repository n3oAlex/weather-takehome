import { DailyHighLowView } from "./WeatherViews/WeatherCharts/DailyHighLowView";
import { DailyTempsView } from "./WeatherViews/WeatherCharts/DailyTempsView";
import { DetailedDataView } from "./WeatherViews/DetailedDataView";
import { HourlyTempsView } from "./WeatherViews/WeatherCharts/HourlyTempsView";
import { WeatherContext } from "../contexts/WeatherContext";
import { WeatherDetails } from "./WeatherViews/WeatherDetails";
import { useContext } from "react";

export const ViewSwitch = () => {
  const { viewToken } = useContext(WeatherContext);

  switch (viewToken) {
    case 1:
      return <DailyTempsView />;
    case 2:
      return <DailyHighLowView />;
    case 3:
      return <HourlyTempsView />;
    case 4:
      return <WeatherDetails />;
    case 5:
      return <DetailedDataView />;
    default:
      return null;
  }
};
