import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { generateSalt, hash } from "../util/auth";
import { Pool } from "pg";

const router = express.Router();

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USERNAME, // Username for PostgreSQL
  host: process.env.PG_HOSTNAME, // Endpoint of your RDS instance
  database: process.env.PG_DATABASE, // Database name
  password: process.env.PG_PASSWORD, // Password for PostgreSQL user
  port: Number(process.env.PG_PORT), // Port number (5432 is default for PostgreSQL)
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS
  },
});

router.post("/users", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const salt = generateSalt();
  const passwordHash = hash(password, salt);

  res.send("sent");

  try {
    const result = await pool.query(`
      INSERT INTO users (username, password_hash, salt)
      VALUES ('${username}', '${passwordHash}', '${salt}');
    `); // Example query
    res.json(result.rows); // Send the result as JSON
  } catch (err) {
    console.error(
      `Something went wrong while adding a user to postgres: ${err}`
    );
    res.status(500).send("Error connecting to the database");
  }
});

router.delete("/users/:id", (req: Request, res: Response) => {});

export default router;
