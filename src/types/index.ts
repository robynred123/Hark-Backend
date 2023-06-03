export type EnergyData = {
  Timestamp: string;
  Consumption: string;
};

export type WeatherData = {
  ["Date"]: string;
  AverageTemperature: string;
  AverageHumidity: string;
};

type formattedData = {
  dateTime?: string;
  energyConsumption?: string;
  anomalyConsumption?: string;
  avgTemperature?: string;
  avgHumidity?: string;
};

export type MappedData = { [key: string]: formattedData };
