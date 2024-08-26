import { ScoreItem } from "../../lib/definitions";
import client from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const a = async (req: NextApiRequest, res: NextApiResponse<ScoreItem[]>) => {
  if (req.method === "GET") {
    try {
      const db = client.db("Summercamp2025");
      const points = await db.collection("Points").find({}).toArray();
      const parsedPoints: ScoreItem[] = points.map((point) => {
        return {
          colorClass: point.colorClass,
          points: point.points,
          name: point.name,
          team: point.team,
        };
      });
      res.json(parsedPoints);
    } catch (e) {
      console.error(e);
    }
  } else if (req.method === "POST") {
    try {
      const db = client.db("Summercamp2025");
      const points = await db.collection("Points").insertOne(req.body);
    } catch (e) {
      console.error(e);
    }
  }
};

export default a;
