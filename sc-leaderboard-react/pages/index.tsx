import ScoreItemComponent, { ScoreItem } from "./ScoreItem";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../lib/mongodb";
import { useEffect, useState } from "react";

const items: ScoreItem[] = [
  { colorClass: "bg-red-500", points: 10, name: 'ROOD' },
  { colorClass: "bg-blue-500", points: 20, name: 'BLAUW' },
  { colorClass: "bg-green-500", points: 30, name: 'GROEN' },
  { colorClass: "bg-yellow-500", points: 40, name: 'GEEL' },
  { colorClass: "bg-purple-500", points: 50, name: 'PAARS' },
  { colorClass: "bg-pink-500", points: 60, name: 'ROZE' },
  { colorClass: "bg-orange-500", points: 70, name: 'ORANJE' },
  { colorClass: "bg-white", points: 80, name: 'WIT' },
]

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect();

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

const testData: ScoreItem = {
  colorClass: "bg-white",
  points: 80,
  name: 'WIT' 
}

async function addToDb(item: ScoreItem) {
  await fetch('http://localhost:3000/api/score-items', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export default function App({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  const [data, setData] = useState<ScoreItem[]>([]) 
  const [isLoading, setLoading] = useState(true)

  

  useEffect(() => {
    fetch('http://localhost:3000/api/score-items')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
    <div id="" className="text-grey-200">
      <h1>SUMMERCAMP 2025</h1>
    </div>
    <div>
        <button onClick={() => addToDb(testData)}>Add to db</button>

        <table>
          {data.map((item, index) => ScoreItemComponent(index, item))}
        </table>
    </div>
  </main>
  );
}
