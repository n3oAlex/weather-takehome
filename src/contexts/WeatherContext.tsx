import { AllTheCitiesType, CityType, defaultCities } from "../types/allTheCities";
import { OneCall } from "../types/OpenWeatherMap";
import { debounce } from "../utils/debounce";
import { defineTranslations } from "../translations/translate";
import { genericHookContextBuilder } from "../utils/genericHookContextBuilder";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const t = defineTranslations(
  {
    currentLocation: {
      en: "Current location",
      cs: "Aktuální pozice",
    },
  },
  "weatherContext"
);

const API_KEY = process.env.WEATHER_API_KEY;

const useValue = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [data, setData] = useState<null | OneCall>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationName, setLocationName] = useState("");
  const [options, setOptions] = useState<AllTheCitiesType>(defaultCities);
  const [locationValue, setLocationValue] = useState<CityType | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewToken, setViewToken] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const setLocalPosition = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
      setLocationName(t.translate.currentLocation());
      setLocationValue(null);
    });
  };

  useEffect(() => {
    if (!position) {
      setData({} as OneCall);
      return;
    }
    const getData = async () => {
      try {
        const res = await axios.get<OneCall>(
          `https://api.openweathermap.org/data/2.5/onecall?lon=${position[1]}&lat=${position[0]}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
        );
        setData(res.data);
      } catch (error: any) {
        console.error(error.response);
      }
    };
    if ((position[0] || position[0] === 0) && (position[1] || position[1] === 0)) getData();
  }, [position]);

  const handleSearch = useCallback(
    debounce(async (search: string) => {
      if (search.length >= 2) {
        setLoading(true);
        const res = await axios.get<AllTheCitiesType>(`api/cities?search=${search}`);
        setOptions(res.data);
        setLoading(false);
      } else {
        setOptions(defaultCities);
      }
    }, 500),
    []
  );

  return {
    data,
    searchTerm,
    locationName,
    options,
    locationValue,
    loading,
    setLocalPosition,
    handleSearch,
    setLocationValue,
    setLocationName,
    setPosition,
    setSearchTerm,
    viewToken,
    setViewToken,
  };
};

export const { Context: WeatherContext, ContextProvider: WeatherContextProvider } =
  genericHookContextBuilder(useValue);
