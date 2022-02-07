import { AllTheCitiesType, CityType } from "../../src/types/allTheCities";
import allCities from "all-the-cities";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = AllTheCitiesType;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { search },
    method,
  } = req;
  const searchTerm = search as string;
  const cities: AllTheCitiesType = allCities.filter((city: CityType) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  switch (method) {
    case "GET":
      res.status(200).json(cities);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
