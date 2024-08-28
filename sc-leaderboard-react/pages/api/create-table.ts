import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const dropResult =
      await sql`DROP TABLE IF EXISTS scores, teams, activities;`;

    const removeType = await sql`DROP TYPE IF EXISTS team_name;`;

    const result_1 = await sql`
        CREATE TYPE team_name AS ENUM (
            'red',
            'blue',
            'green',
            'yellow',
            'purple',
            'orange',
            'pink',
            'white'
        );`;

    const result_2 = await sql`
        CREATE TABLE teams (
            id SERIAL PRIMARY KEY,
            name team_name NOT NULL UNIQUE
        );
        `;
    const result_3 = await sql`
        CREATE TABLE activities (
            id SERIAL PRIMARY KEY,
            name_of_activity VARCHAR(255) NOT NULL,
            date_of_activity DATE NOT NULL
        );
`;
    const result_4 = await sql`
        CREATE TABLE scores (
            id SERIAL PRIMARY KEY,
            points INT NOT NULL,
            team_id INT REFERENCES teams(id) ON DELETE CASCADE,
            activity_id INT REFERENCES activities(id) ON DELETE CASCADE
        );
        `;
    return response
      .status(200)
      .json({ dropResult, removeType, result_1, result_2, result_3, result_4 });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
