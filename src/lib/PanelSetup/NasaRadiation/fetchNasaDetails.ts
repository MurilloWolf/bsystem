import { ApiResponse, Location } from "./types";

const BASE_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point";
const queryDate = `start=2021&end=2022`;
const queryLocation = "latitude=#latitude&longitude=#longitude";
const queryApiSetup =
  "community=sb&parameters=ALLSKY_SFC_SW_DWN&format=json&user=bsystem&header=true&time-standard=utc";

const endpoint = `${BASE_URL}?${queryDate}&${queryLocation}&${queryApiSetup}`;

const fetchNasaDetails = async (
  location: Location
): Promise<ApiResponse | Error> => {
  if (!location.latitude || !location.longitude) {
    throw new Error("Location is not defined");
  }

  const endpointWithLocation = endpoint
    .replace("#latitude", location.latitude.toString())
    .replace("#longitude", location.longitude.toString());

  try {
    const response = await fetch(endpointWithLocation);
    const data = (await response.json()) as ApiResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
};

export default fetchNasaDetails;
