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
  const originString = `${origin.longitude},${origin.latitude}`;
  const destinationString = `${destination.longitude},${destination.latitude}`;
  const endpoint = `${BASE_URL}${originString};${destinationString}?access_token=${TOKEN}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    return data.routes[0].distance;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default fetchDistanceDriving;
