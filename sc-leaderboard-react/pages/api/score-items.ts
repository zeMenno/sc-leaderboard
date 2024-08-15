import client from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET") { 
        try {
            const db = client.db("Summercamp2025");
            const points = await db
                .collection("Points")
                .find({})
                .toArray();
            res.json(points);
        } catch (e) {
            console.error(e);
        }
    }
    else if (req.method === "POST") {
        try {
            const db = client.db("Summercamp2025");
            const points = await db
                .collection("Points")
                .insertOne(req.body);
            res.json(points);
        } catch (e) {
            console.error(e);
        }
    }   
}