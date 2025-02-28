/* eslint-disable @typescript-eslint/no-require-imports */
describe("DistanceBerweenCities", () => {
  const defaultEnv: NodeJS.ProcessEnv = process.env;

  beforeEach(() => {
    window.global.fetch = jest.fn();
    window.console.error = jest.fn();
    process.env = { ...defaultEnv };
  });

  afterAll(() => {
    process.env = defaultEnv;
  });

  it("should be call url correctly", async () => {
    // Arrange
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "token";
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        routes: [{ distance: 100 }],
      }),
    });
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 3, longitude: 4 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    fetchDistanceDriving(origin, destination);

    // Assert
    expect(window.global.fetch).toHaveBeenCalledWith(
      "https://api.mapbox.com/directions/v5/mapbox/driving/2,1;4,3?access_token=token"
    );
  });

  it("should be return the correctly distance", async () => {
    // Arrange
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "token";
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        routes: [{ distance: 100 }],
      }),
    });
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 3, longitude: 4 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    const response = await fetchDistanceDriving(origin, destination);

    // Assert
    expect(response).toBe(100);
  });

  it("should be return 0 when the origin and destination are the same", async () => {
    // Arrange
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 1, longitude: 2 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    const response = await fetchDistanceDriving(origin, destination);

    // Assert
    expect(response).toBe(0);
  });

  it("should be return 0 when has no response", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    });
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 3, longitude: 4 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    const response = await fetchDistanceDriving(origin, destination);

    // Assert
    expect(response).toBe(0);
  });

  it("should be return 0 when the response is empty", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ routes: [{}] }),
    });
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 3, longitude: 4 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    const response = await fetchDistanceDriving(origin, destination);

    // Assert
    expect(response).toBe(0);
  });

  it("should be throw an error when the fetch fails", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockRejectedValue(
      new Error("Error fetching the distance")
    );
    const origin = { latitude: 1, longitude: 2 };
    const destination = { latitude: 3, longitude: 4 };

    // Import the function after setting the environment variables
    const fetchDistanceDriving = (await require("./fetchDistanceDriving"))
      .default;

    // Act
    await expect(
      fetchDistanceDriving(origin, destination)
    ).rejects.toThrowError("Error fetching the distance");

    expect(window.console.error).toHaveBeenCalled();
  });
});
