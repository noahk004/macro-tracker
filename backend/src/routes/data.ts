import express, { Response } from "express";
import { CustomRequest } from "../../types/express";
import pool from "../util/db";

const router = express.Router();

router.get("/items", async (req: CustomRequest, res: Response) => {
  try {
    const userData = req.body.user;

    if (!userData) {
      throw Error("User field in request body is empty.");
    }

    const result = await pool.query(
      `SELECT * FROM items WHERE user_id = ${userData.userId}`
    );

    res.status(200).json({
      success: true,
      result: result.rows,
    });
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching items.",
    });
  }
});

router.post("/items", async (req: CustomRequest, res: Response) => {
  const {
    name,
    serving_size,
    serving_size_unit,
    calories_serving,
    protein_serving,
  } = req.body;

  const userData = req.body.user;
  const user_id = userData.userId;

  if (!userData) {
    throw Error("User field in request body is empty.");
  }

  if (
    !name ||
    !serving_size ||
    !serving_size_unit ||
    !calories_serving ||
    !protein_serving
  ) {
    res.status(400).json({ message: "All required fields must be provided." });
    return;
  }

  try {
    const query =
      "INSERT INTO items (name, serving_size, serving_size_unit, calories_serving, protein_serving, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      name,
      serving_size,
      serving_size_unit,
      calories_serving,
      protein_serving,
      user_id,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ item: result.rows[0] });
  } catch (error) {
    console.error("Error inserting item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the item." });
  }
});

export default router;
