import express, { Response } from "express";
import { CustomRequest } from "../../types/express";
import { generateSalt, generateToken, hash } from "../util/auth";

import pool from "../util/db";

const router = express.Router();

router.post("/users", async (req: CustomRequest, res: Response) => {
  console.log("POST REQUEST MADE TO /api/auth/users")
  try {
    const { username, password } = req.body;

    const salt = generateSalt();
    const passwordHash = hash(password, salt);

    // Check if username already exists
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.status(500).json({ message: "Username already exists, duplicate username." });
      return;
    }

    await pool.query(`
      INSERT INTO users (username, password_hash, salt)
      VALUES ('${username}', '${passwordHash}', '${salt}');
    `);
    res.status(201).json({ message: `User created: ${username}` });
  } catch (err) {
    console.error(
      `Something went wrong while adding a user to postgres: ${err}`
    );
    res.status(500).json({ message: "Error connecting to the database." });
  }
});

router.post("/token", async (req: CustomRequest, res: Response) => {
  console.log("POST REQUEST MADE TO /api/auth/tokens")

  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length == 0) {
      res.status(404).send("User not found");
      return;
    }

    if (hash(password, result.rows[0].salt) == result.rows[0].password_hash) {
      const jwt = generateToken(result.rows[0].user_id, username);
      
      res.cookie("jwt", jwt, {
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      res.status(200).json({ message: "Token created." })
      return;
    } else {
      res.status(401).json({ message: "Password incorrect." });
      return;
    }
  } catch (err) {
    console.error(
      `Something went wrong while fetching a token to postgres: ${err}.`
    );
    res.status(500).json({ message: "Error connecting to the database." });
  }
});

export default router;
