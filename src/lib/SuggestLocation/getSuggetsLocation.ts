import { Feature, FetchSuggestionsResponse } from "./types";

const BASE_URL = "https://api.mapbox.com/search/geocode/v6/forward?";
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const queryParams = `access_token=${TOKEN}&country=BR&types=place`;

const fetchSuggestions = async (
  city: string
): Promise<FetchSuggestionsResponse> => {
  const encondedCity = encodeURI(city);
  const endpoint = `${BASE_URL}q=${encondedCity}&${queryParams}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return { data: { features: [...data.features], success: true } };
  } catch (error) {
    return { data: { error: error, success: false } };
  }
};

export const formatSuggestions = (data: Feature[]) => {
  if (!data) return [];

  return data
    .filter((item) => item && item.properties)
    .map((city) => {
      return {
        label: `${city.properties.name}, ${city.properties.context.region.name}`,
        value: city.properties.name.toLowerCase(),
        coordinates: city.properties.coordinates,
      };
    });
};

export default fetchSuggestions;
