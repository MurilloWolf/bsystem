import fetchNasaDetails from "./fetchNasaDetails";

const mockedReturn = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-22.131, -51.389, 0.0],
  },
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: {
        "202101": 166.76,
        "202102": 158.59,
        "202103": 103.75,
        "202104": 61.27,
        "202105": 33.13,
        "202106": 20.8,
        "202107": 24.07,
        "202108": 44.83,
        "202109": 79.58,
        "202110": 134.64,
        "202111": 197.34,
        "202112": 223.66,
        "202113": 104.04,
        "202201": 207.85,
        "202202": 175.45,
        "202203": 106.54,
        "202204": 59.48,
        "202205": 32.38,
        "202206": 22.32,
        "202207": 24.59,
        "202208": 44.24,
        "202209": 89.57,
        "202210": 125.56,
        "202211": 173.44,
        "202212": 222.77,
        "202213": 107.02,
      },
    },
  },
  header: {
    title: "NASA/POWER Source Native Resolution Monthly and Annual",
    api: {
      version: "v2.6.6",
      name: "POWER Monthly and Annual API",
    },
    sources: ["SYN1DEG"],
    fill_value: -999.0,
    time_standard: "UTC",
    start: "20210101",
    end: "20221231",
  },
  messages: [],
  parameters: {
    ALLSKY_SFC_SW_DWN: {
      units: "W m-2",
      longname: "All Sky Surface Shortwave Downward Irradiance",
    },
  },
  times: {
    data: 2.946,
    process: 0.06,
  },
};

describe("getNasaDetails", () => {
  beforeEach(() => {
    window.global.fetch = jest.fn();
    window.console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch with the correct url", async () => {
    const location = { latitude: 10, longitude: 20 };

    window.global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
    await fetchNasaDetails(location);

    expect(fetch).toHaveBeenCalledWith(
      "https://power.larc.nasa.gov/api/temporal/monthly/point?start=2021&end=2022&latitude=10&longitude=20&community=sb&parameters=ALLSKY_SFC_SW_DWN&format=json&user=bsystem&header=true&time-standard=utc"
    );
  });

  it("should return the correct data", async () => {
    const location = { latitude: 10, longitude: 20 };

    window.global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedReturn),
    });
    const data = await fetchNasaDetails(location);

    expect(data).toStrictEqual(mockedReturn);
  });

  it("should throw an error if location is not defined", async () => {
    const location = { latitude: "", longitude: "" };

    await expect(fetchNasaDetails(location)).rejects.toThrowError(
      "Location is not defined"
    );
  });

  it("should throw an error if fetch fails", async () => {
    const location = { latitude: 10, longitude: 20 };

    window.global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch"));
    await expect(fetchNasaDetails(location)).rejects.toThrowError(
      "Error fetching data"
    );
    expect(window.console.error).toHaveBeenCalled();
  });
});
