import { ScoreItem } from "../../lib/definitions";
import client from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ScoreItem[]>,
) => {
  if (req.method === "GET") {
    try {
      const db = client.db("Summercamp2025");
      const collection = db.collection<ScoreItem>("Points");
      const points = await collection.find({}).toArray();
      res.json(points);
    } catch (e) {
      console.error(e);
    }
  } else if (req.method === "POST") {
    try {
      const db = client.db("Summercamp2025");
      const collection = db.collection<ScoreItem>("Points");
      await collection.insertOne(req.body);
    } catch (e) {
      console.error(e);
    }
  }
};

export default handler;
