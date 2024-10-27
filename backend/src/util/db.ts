import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

if (
  !process.env.PG_USERNAME ||
  !process.env.PG_HOSTNAME ||
  !process.env.PG_DATABASE ||
  !process.env.PG_PASSWORD ||
  !process.env.PG_PORT
) {
    throw new Error("One or more environment variables are not defined.")
}

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

export default pool;
