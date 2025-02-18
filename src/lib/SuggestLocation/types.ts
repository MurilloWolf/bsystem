interface Geometry {
  type: "Point";
  coordinates: [number, number];
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface BoundingBox {
  bbox: [number, number, number, number];
}

interface RegionContext {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code: string;
  region_code_full: string;
}

interface CountryContext {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  country_code: string;
  country_code_alpha_3: string;
}

interface PlaceContext {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
}

interface Context {
  region: RegionContext;
  country: CountryContext;
  place: PlaceContext;
}

interface Properties extends BoundingBox {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted: string;
  context: Context;
}

interface SuccessResponse {
  success: true;
  features: Feature[];
}

interface ErrorResponse {
  success: false;
  error: string | unknown;
}

export interface Feature {
  type: "Feature";
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface FetchSuggestionsResponse {
  data: SuccessResponse | ErrorResponse;
}

export interface SuggestCity {
  label: string;
  value: string;
  coordinates: Coordinates;
}
