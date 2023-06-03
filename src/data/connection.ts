import fs from "fs";
import csv from "csv-parser";
import path from "path";

const directory = `${path.resolve()}/src/data/`;

export const readCSVFile = (fileName: string): Promise<object[]> => {
  const joinedPath = path.join(directory, fileName);
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(joinedPath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
