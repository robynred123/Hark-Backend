import getAllData from "./getAllData.ts";
import * as dataConnection from "../data/connection.ts";
import { EnergyData, MappedData, WeatherData } from "../types/index.ts";

const mockGetData = jest.spyOn(dataConnection, "readCSVFile");
describe("getAllData", () => {
  const testEnergyData: EnergyData[] = [
    { Timestamp: "2020-01-01T00:00:00Z", Consumption: "10.33" },
    { Timestamp: "2020-01-01T00:30:00Z", Consumption: "0.87" },
    { Timestamp: "2020-01-01T01:00:00Z", Consumption: "6.97" },
    { Timestamp: "2020-01-01T01:30:00Z", Consumption: "13.18" },
  ];

  const testAnomalyData: EnergyData[] = [
    { Timestamp: "2020-01-01T00:00:00Z", Consumption: "10.33" },
    { Timestamp: "2020-01-01T01:30:00Z", Consumption: "13.18" },
  ];

  const testWeatherData: WeatherData[] = [
    {
      Date: "01/01/2020 00:00",
      AverageTemperature: "9.25",
      AverageHumidity: "0.93",
    },
    {
      Date: "01/01/2020 00:30",
      AverageTemperature: "9.25",
      AverageHumidity: "0.93",
    },
    {
      Date: "01/01/2020 01:00",
      AverageTemperature: "9.27",
      AverageHumidity: "0.94",
    },
  ];

  const returnedData: MappedData = {
    "2020-01-01T00:00:00.000Z": {
      anomalyConsumption: "10.33",
      avgHumidity: "0.93",
      avgTemperature: "9.25",
      dateTime: "2020-01-01T00:00:00.000Z",
      energyConsumption: "10.33",
    },
    "2020-01-01T00:30:00.000Z": {
      avgHumidity: "0.93",
      avgTemperature: "9.25",
      dateTime: "2020-01-01T00:30:00.000Z",
      energyConsumption: "0.87",
    },
    "2020-01-01T01:00:00.000Z": {
      avgHumidity: "0.94",
      avgTemperature: "9.27",
      dateTime: "2020-01-01T01:00:00.000Z",
      energyConsumption: "6.97",
    },
    "2020-01-01T01:30:00.000Z": {
      anomalyConsumption: "13.18",
      dateTime: "2020-01-01T01:30:00.000Z",
      energyConsumption: "13.18",
    },
  };

  it("should successfully return mapped data", async () => {
    mockGetData.mockResolvedValueOnce(testEnergyData);
    mockGetData.mockResolvedValueOnce(testAnomalyData);
    mockGetData.mockResolvedValue(testWeatherData);

    const data = await getAllData();

    expect(data).toEqual(returnedData);
  });

  // seperate tests can be made for each data set, however this feels redundant at this point
  it("should throw an error if data is not returned as expected", async () => {
    mockGetData.mockResolvedValueOnce(testEnergyData);
    mockGetData.mockRejectedValue(undefined);
    mockGetData.mockResolvedValue(testWeatherData);

    await expect(() => getAllData()).rejects.toThrow();
  });
});
