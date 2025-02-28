const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox/driving/";
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Coordinates {
  latitude: number;
  longitude: number;
}

const fetchDistanceDriving = async (
  origin: Coordinates,
  destination: Coordinates
): Promise<number> => {
  if (
    origin.latitude === destination.latitude &&
    origin.longitude === destination.longitude
  ) {
    return 0;
  }

  const originString = `${origin.longitude},${origin.latitude}`;
  const destinationString = `${destination.longitude},${destination.latitude}`;
  const endpoint = `${BASE_URL}${originString};${destinationString}?access_token=${TOKEN}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data?.routes[0]?.distance || 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching the distance");
  }
};

export default fetchDistanceDriving;
