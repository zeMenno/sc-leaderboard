import { NextApiRequest, NextApiResponse } from "next";
import { ScoreItem, TeamName } from "../../lib/definitions";
import { sql } from "@vercel/postgres";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ScoreItem[]>,
) => {
  if (req.method === "POST") {
    const { nameOfActivity, dateOfActivity, scorePerTeam } =
      req.body as ScoreItem;

    // Insert activity
    const result = await sql.query(
      `
        INSERT INTO activities (name_of_activity, date_of_activity)
        VALUES ($1, $2)
        RETURNING id
      `,
      [nameOfActivity, dateOfActivity],
    );

    const activityId = result.rows[0].id;

    // Insert scores for teams
    for (const score of scorePerTeam) {
      // Insert or fetch team ID
      const teamResult = await sql.query(
        `
          INSERT INTO teams (name)
          VALUES ($1)
          ON CONFLICT (name) DO NOTHING
          RETURNING id
        `,
        [score.team],
      );

      const teamId = teamResult.rows.length > 0 ? teamResult.rows[0].id : null;

      await sql.query(
        `
          INSERT INTO scores (points, team_id, activity_id)
          VALUES ($1, $2, $3)
        `,
        [score.points, teamId, activityId],
      );
    }
  } else if (req.method === "GET") {
    const result = await sql`
        SELECT
          a.name_of_activity,
          a.date_of_activity,
          json_agg(json_build_object('team', t.name, 'points', s.points)) as score_per_team
        FROM activities a
        JOIN scores s ON a.id = s.activity_id
        JOIN teams t ON s.team_id = t.id
        GROUP BY a.id;
      `;

    const resultParsed = result.rows.map((row) => ({
      nameOfActivity: row.name_of_activity,
      dateOfActivity: row.date_of_activity,
      scorePerTeam: row.score_per_team.map((teamScore: any) => ({
        team: teamScore.team as TeamName, // Cast to the enum type
        points: teamScore.points,
      })),
    }));

    res.json(resultParsed);
  }
};
export default handler;
