export type AllTheCitiesType = CityType[];

export type CityType = {
  cityId: string;
  name: string;
  altName?: string;
  country: string;
  altCountry?: string;
  muni?: string;
  muniSub?: string;
  featureClass?: string;
  featureCode: string;
  adminCode: string;
  population: number;
  loc: {
    type: string;
    coordinates: [number, number];
  };
};

export const defaultCities = [
  {
    cityId: "3078610",
    name: "Brno",
    altName: "",
    country: "CZ",
    featureCode: "PPLA",
    adminCode: "78",
    population: 369559,
    loc: {
      type: "Point",
      coordinates: [16.60796, 49.19522],
    },
  },
  {
    cityId: "3060972",
    name: "Bratislava",
    altName: "",
    country: "SK",
    featureCode: "PPLC",
    adminCode: "02",
    population: 423737,
    loc: {
      type: "Point",
      coordinates: [17.10674, 48.14816],
    },
  },
  {
    cityId: "3143244",
    name: "Oslo",
    altName: "",
    country: "NO",
    featureCode: "PPLC",
    adminCode: "12",
    population: 580000,
    loc: {
      type: "Point",
      coordinates: [10.74609, 59.91273],
    },
  },
  {
    cityId: "3067696",
    name: "Prague",
    altName: "",
    country: "CZ",
    featureCode: "PPLC",
    adminCode: "52",
    population: 1165581,
    loc: {
      type: "Point",
      coordinates: [14.42076, 50.08804],
    },
  },
] as AllTheCitiesType;
