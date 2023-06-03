import { readCSVFile } from "../data/connection.ts";
import { EnergyData, WeatherData, MappedData } from "../types/index.ts";
import { formatDate } from "../utils/formatDate.ts";

const getAllData = async () => {
  const energyFileName = "HalfHourlyEnergyData.csv";
  const anomalyFileName = "HalfHourlyEnergyDataAnomalies.csv";
  const weatherFileName = "Weather.csv";

  const energyData = (await readCSVFile(
    energyFileName
  )) as unknown as EnergyData[];

  const anomalyData = (await readCSVFile(
    anomalyFileName
  )) as unknown as EnergyData[];

  const weatherData = (await readCSVFile(
    weatherFileName
  )) as unknown as WeatherData[];

  const mappedData: MappedData = {};

  energyData.map((e) => {
    const formattedDate = formatDate(e.Timestamp);
    return (mappedData[formattedDate] = {
      dateTime: formattedDate,
      energyConsumption: e.Consumption,
    });
  });

  anomalyData.map((a) => {
    const formattedDate = formatDate(a.Timestamp);
    return (mappedData[formattedDate] = {
      anomalyConsumption: a.Consumption,
      ...mappedData[formattedDate],
    });
  });

  weatherData.map((w) => {
    // get first value off w, this would break if the data structure changes.
    const formattedDate = formatDate(Object.values(w)[0]);
    return (mappedData[formattedDate] = {
      avgTemperature: w.AverageTemperature,
      avgHumidity: w.AverageHumidity,
      ...mappedData[formattedDate],
    });
  });

  return mappedData;
};

export default getAllData;