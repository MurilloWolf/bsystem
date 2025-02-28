/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Feature } from "./types";

describe("SuggestLocation", () => {
  const defaultEnv: NodeJS.ProcessEnv = process.env;

  beforeEach(() => {
    window.global.fetch = jest.fn();
    process.env = { ...defaultEnv };
  });

  afterAll(() => {
    process.env = defaultEnv;
  });

  const featuresMock = [
    {
      type: "Feature",
      id: "dXJuOm1ieHBsYzpBZmlJSUE",
      geometry: {
        type: "Point",
        coordinates: [-51.388275, -22.12253],
      },
      properties: {
        mapbox_id: "dXJuOm1ieHBsYzpBZmlJSUE",
        feature_type: "place",
        full_address: "Presidente Prudente, São Paulo, Brazil",
        name: "Presidente Prudente",
        name_preferred: "Presidente Prudente",
        coordinates: {
          longitude: -51.388275,
          latitude: -22.12253,
        },
        place_formatted: "São Paulo, Brazil",
        bbox: [-51.483948, -22.20572, -51.223621, -21.721309],
        context: {
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpaQ0E",
            name: "São Paulo",
            wikidata_id: "Q175",
            region_code: "SP",
            region_code_full: "BR-SP",
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaUE",
            name: "Brazil",
            wikidata_id: "Q155",
            country_code: "BR",
            country_code_alpha_3: "BRA",
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpBZmlJSUE",
            name: "Presidente Prudente",
            wikidata_id: "Q525618",
          },
        },
      },
    },
    {
      type: "Feature",
      id: "dXJuOm1ieHBsYzpBZmJJSUE",
      geometry: {
        type: "Point",
        coordinates: [-52.11118, -21.768127],
      },
      properties: {
        mapbox_id: "dXJuOm1ieHBsYzpBZmJJSUE",
        feature_type: "place",
        full_address: "Presidente Epitácio, São Paulo, Brazil",
        name: "Presidente Epitácio",
        name_preferred: "Presidente Epitácio",
        coordinates: {
          longitude: -52.11118,
          latitude: -21.768127,
        },
        place_formatted: "São Paulo, Brazil",
        bbox: [-52.456185, -22.273056, -51.941077, -21.493307],
        context: {
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpaQ0E",
            name: "São Paulo",
            wikidata_id: "Q175",
            region_code: "SP",
            region_code_full: "BR-SP",
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaUE",
            name: "Brazil",
            wikidata_id: "Q155",
            country_code: "BR",
            country_code_alpha_3: "BRA",
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpBZmJJSUE",
            name: "Presidente Epitácio",
            wikidata_id: "Q983495",
          },
        },
      },
    },
    {
      type: "Feature",
      id: "dXJuOm1ieHBsYzpBZmtJSUE",
      geometry: {
        type: "Point",
        coordinates: [-51.843945, -21.875265],
      },
      properties: {
        mapbox_id: "dXJuOm1ieHBsYzpBZmtJSUE",
        feature_type: "place",
        full_address: "Presidente Venceslau, São Paulo, Brazil",
        name: "Presidente Venceslau",
        name_preferred: "Presidente Venceslau",
        coordinates: {
          longitude: -51.843945,
          latitude: -21.875265,
        },
        place_formatted: "São Paulo, Brazil",
        bbox: [-52.030407, -22.006626, -51.695705, -21.576865],
        context: {
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpaQ0E",
            name: "São Paulo",
            wikidata_id: "Q175",
            region_code: "SP",
            region_code_full: "BR-SP",
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaUE",
            name: "Brazil",
            wikidata_id: "Q155",
            country_code: "BR",
            country_code_alpha_3: "BRA",
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpBZmtJSUE",
            name: "Presidente Venceslau",
            wikidata_id: "Q1645733",
          },
        },
      },
    },
    {
      type: "Feature",
      id: "dXJuOm1ieHBsYzpBZmNJSUE",
      geometry: {
        type: "Point",
        coordinates: [-49.62261, -27.046543],
      },
      properties: {
        mapbox_id: "dXJuOm1ieHBsYzpBZmNJSUE",
        feature_type: "place",
        full_address: "Presidente Getúlio, Santa Catarina, Brazil",
        name: "Presidente Getúlio",
        name_preferred: "Presidente Getúlio",
        coordinates: {
          longitude: -49.62261,
          latitude: -27.046543,
        },
        place_formatted: "Santa Catarina, Brazil",
        bbox: [-49.847547, -27.147523, -49.576416, -26.924716],
        context: {
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpBZVFn",
            name: "Santa Catarina",
            wikidata_id: "Q41115",
            region_code: "SC",
            region_code_full: "BR-SC",
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaUE",
            name: "Brazil",
            wikidata_id: "Q155",
            country_code: "BR",
            country_code_alpha_3: "BRA",
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpBZmNJSUE",
            name: "Presidente Getúlio",
            wikidata_id: "Q1757828",
          },
        },
      },
    },
    {
      type: "Feature",
      id: "dXJuOm1ieHBsYzpBZmJvSUE",
      geometry: {
        type: "Point",
        coordinates: [-60.024673, -2.052048],
      },
      properties: {
        mapbox_id: "dXJuOm1ieHBsYzpBZmJvSUE",
        feature_type: "place",
        full_address: "Presidente Figueiredo, Amazonas, Brazil",
        name: "Presidente Figueiredo",
        name_preferred: "Presidente Figueiredo",
        coordinates: {
          longitude: -60.024673,
          latitude: -2.052048,
        },
        place_formatted: "Amazonas, Brazil",
        bbox: [-60.964236, -2.480106, -59.082446, 0.038235],
        context: {
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpBUVFn",
            name: "Amazonas",
            wikidata_id: "Q40040",
            region_code: "AM",
            region_code_full: "BR-AM",
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaUE",
            name: "Brazil",
            wikidata_id: "Q155",
            country_code: "BR",
            country_code_alpha_3: "BRA",
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpBZmJvSUE",
            name: "Presidente Figueiredo",
            wikidata_id: "Q655097",
          },
        },
      },
    },
  ];

  describe("fetchSuggestions", () => {
    it("should return call correctly url on fetch", async () => {
      process.env = {
        ...defaultEnv,
        NODE_ENV: "development",
        NEXT_PUBLIC_MAPBOX_TOKEN: "token",
      };

      const fetchSuggestions = (await import("./getSuggetsLocation")).default;

      // Arrange
      const city = "São Paulo";
      const encodedCity = encodeURI(city);
      const endpoint = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedCity}&access_token=token&country=BR&types=place`;

      fetchSuggestions(city);
      expect(fetch).toHaveBeenCalledWith(endpoint);
    });

    it("should return correctly formatted data", async () => {
      const fetchSuggestions = (await import("./getSuggetsLocation")).default;

      // Arrange
      const city = "São Paulo";

      window.global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ features: featuresMock }),
      });

      // Act
      const response = await fetchSuggestions(city);

      // Assert
      expect(response.data.success).toBeTruthy();

      if (response.data.success) {
        expect(response.data.features).toHaveLength(5);
        expect(response.data.features[0]).toStrictEqual(featuresMock[0]);
      }
    });

    it("should return correctly formatted data when no features are found", async () => {
      const fetchSuggestions = (await import("./getSuggetsLocation")).default;

      // Arrange
      const city = "São Paulo";

      window.global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ features: [] }),
      });

      // Act
      const response = await fetchSuggestions(city);

      // Assert
      expect(response.data.success).toBeTruthy();

      if (response.data.success) {
        expect(response.data.features).toHaveLength(0);
        expect(response.data.features).toStrictEqual([]);
      }
    });

    it("should return correctly formatted error", async () => {
      const fetchSuggestions = (await import("./getSuggetsLocation")).default;

      // Arrange
      const city = "São Paulo";

      window.global.fetch = jest.fn().mockRejectedValue("error");

      // Act
      const response = await fetchSuggestions(city);

      // Assert
      expect(response.data.success).toBeFalsy();
      if (!response.data.success) expect(response.data.error).toBe("error");
    });
  });

  describe("formatSuggestions", () => {
    it("should return correctly formatted data", async () => {
      const formatSuggestions = (await import("./getSuggetsLocation"))
        .formatSuggestions;

      // Arrange
      const formattedData = formatSuggestions(featuresMock as Feature[]);
      const expectedData = [
        {
          label: "Presidente Prudente, São Paulo",
          value: "presidente prudente",
          coordinates: {
            longitude: -51.388275,
            latitude: -22.12253,
          },
        },
        {
          label: "Presidente Epitácio, São Paulo",
          value: "presidente epitácio",
          coordinates: {
            longitude: -52.11118,
            latitude: -21.768127,
          },
        },
        {
          label: "Presidente Venceslau, São Paulo",
          value: "presidente venceslau",
          coordinates: {
            longitude: -51.843945,
            latitude: -21.875265,
          },
        },
        {
          label: "Presidente Getúlio, Santa Catarina",
          value: "presidente getúlio",
          coordinates: {
            longitude: -49.62261,
            latitude: -27.046543,
          },
        },
        {
          label: "Presidente Figueiredo, Amazonas",
          value: "presidente figueiredo",
          coordinates: {
            longitude: -60.024673,
            latitude: -2.052048,
          },
        },
      ];

      // Assert
      expect(formattedData).toStrictEqual(expectedData);
    });
  });

  it("should return correctly formatted data when no features are found", async () => {
    const formatSuggestions = (await import("./getSuggetsLocation"))
      .formatSuggestions;

    // Arrange
    const formattedData = formatSuggestions([] as Feature[]);
    // @ts-expect-error
    const expectedData = [];

    // Assert
    // @ts-expect-error
    expect(formattedData).toStrictEqual(expectedData);
  });

  it("should return correctly formatted error", async () => {
    const formatSuggestions = (await import("./getSuggetsLocation"))
      .formatSuggestions;

    // Arrange
    // @ts-expect-error
    const formattedData = formatSuggestions(null);
    // @ts-expect-error
    const expectedData = [];

    // Assert
    // @ts-expect-error
    expect(formattedData).toStrictEqual(expectedData);
  });

  it("should return correctly formatted error", async () => {
    const formatSuggestions = (await import("./getSuggetsLocation"))
      .formatSuggestions;

    // Arrange
    // @ts-expect-error
    const formattedData = formatSuggestions([{}]);
    // @ts-expect-error
    const expectedData = [];

    // Assert
    // @ts-expect-error
    expect(formattedData).toStrictEqual(expectedData);
  });
});
