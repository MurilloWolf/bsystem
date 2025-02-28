import calculateSolarRadiationPerAngle from "./calculateSolarRadiationPerAngle";
import { ApiResponse } from "../NasaRadiation/types";
import { Directions } from "./types";

describe("calculateSolarRadiationPerAngle", () => {
  const mockData: ApiResponse = {
    properties: {
      parameter: {
        ALLSKY_SFC_SW_DWN: {
          "1": 5.0,
          "2": 6.0,
          "3": 7.0,
          "4": 8.0,
          "5": 9.0,
          "6": 10.0,
          "7": 11.0,
          "8": 12.0,
          "9": 10.0,
          "10": 8.0,
          "11": 6.0,
          "12": 5.0,
        },
      },
    },
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0, 0],
    },
    header: {
      title: "",
      api: {
        version: "",
        name: "",
      },
      sources: [],
      fill_value: 0,
      time_standard: "",
      start: "",
      end: "",
    },
    messages: [],
    parameters: {
      ALLSKY_SFC_SW_DWN: {
        units: "",
        longname: "",
      },
    },
    times: {
      data: 0,
      process: 0,
    },
  };

  it("should contain all cardinal directions", () => {
    const result = calculateSolarRadiationPerAngle(mockData);
    const expectedDirections: Directions[] = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];
    expectedDirections.forEach((dir) => {
      expect(result).toHaveProperty(dir);
    });
  });

  it("should calculate radiation values for different angles", () => {
    const result = calculateSolarRadiationPerAngle(mockData);
    expect(result.N).toBeDefined();
    expect(result.N["0"]).toBeDefined();
  });
});
