import { Request, Response } from "express";
import express from "express";
import getAllData from "./services/getAllData.ts";

const app = express();

app.use(express.json());

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getAllData();
    res.status(200).json(data);
  } catch (error) {
    // improvements - error handling middleware & better error messages
    res.status(500).json({ error: "something went wrong" });
  }
});
