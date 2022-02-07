import {
  Autocomplete,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { WeatherContext } from "../contexts/WeatherContext";
import { defineTranslations } from "../translations/translate";
import Image from "next/image";
import MapIcon from "@mui/icons-material/Map";
import React, { useContext } from "react";

const t = defineTranslations(
  {
    searchLocation: {
      en: "Search location",
      cs: "Vyhledávání",
    },
  },
  "locationSelect"
);

const Stack_locationSelect = styled(Stack)((p) => ({
  background: "#ffffff10",
  borderRadius: p.theme.spacing(1),
  padding: p.theme.spacing(2),
  width: "90%",
  maxWidth: "450px",
}));

const _LocationSelect = () => {
  const {
    locationValue,
    setLocationValue,
    setLocationName,
    setPosition,
    handleSearch,
    setSearchTerm,
    searchTerm,
    loading,
    options,
    setLocalPosition,
  } = useContext(WeatherContext);

  return (
    <Stack_locationSelect direction="row">
      <Autocomplete
        value={locationValue}
        onChange={(_, newValue: any) => {
          setLocationValue(newValue);
          setLocationName(newValue?.name || "");
          setPosition(newValue ? [newValue.loc.coordinates[1], newValue.loc.coordinates[0]] : null);
        }}
        inputValue={searchTerm}
        onInputChange={(_, newInputValue) => {
          setSearchTerm(newInputValue);
          handleSearch(newInputValue);
        }}
        loading={loading}
        options={options}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            color="primary"
            label={<Typography suppressHydrationWarning>{t.translate.searchLocation()}</Typography>}
            sx={{ "& input": { color: "lightgrey" } }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <React.Fragment key={option.name + option.cityId}>
            <Stack
              component={"li"}
              direction="row"
              alignItems="center"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <Image
                loading="lazy"
                width="32"
                height="18"
                src={`https://flagcdn.com/w20/${option.country?.toLowerCase()}.png`}
                alt={option.country}
              />
              <Typography sx={{ paddingLeft: "1rem" }}>
                {option.name} ({option.country})
              </Typography>
            </Stack>
          </React.Fragment>
        )}
        getOptionLabel={(option) => option.name}
        ListboxProps={{
          style: {
            background: "#121728",
            color: "#85a3b7",
            borderLeft: "4px solid #212635",
            borderRight: "4px solid #212635",
            borderBottom: "4px solid #212635",
            borderRadius: "0.5rem",
          },
        }}
        isOptionEqualToValue={(option, value) =>
          option.cityId.toString() === value.cityId.toString()
        }
      />
      <IconButton
        color="primary"
        onClick={setLocalPosition}
        sx={{
          margin: "0.5rem -0.5rem 0.5rem 0.5rem",
        }}
      >
        <MapIcon />
      </IconButton>
    </Stack_locationSelect>
  );
};

export default _LocationSelect;
