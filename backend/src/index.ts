import express, { Request, Response } from "express";

import cors from "cors";

import dotenv from "dotenv";

import routes from "./routes/auth";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Here are the itemes");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
