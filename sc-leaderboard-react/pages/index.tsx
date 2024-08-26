import ScoreItemComponent from "./ScoreItem";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../lib/mongodb";
import { useEffect, useState } from "react";
import RootLayout from "../components/layout";
import Link from "next/link";
import { ScoreItem, TeamName } from "../lib/definitions";

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
  colorClass: "bg-red-500",
  points: 10,
  name: "ROOD",
  team: TeamName.Red,
};

async function addToDb(item: ScoreItem) {
  await fetch("http://localhost:3000/api/score-items", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function toForm() {}

export default function App({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState<ScoreItem[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/score-items")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <RootLayout>
      <main className="">
        <div id="" className="text-grey-200">
          <h1>SUMMERCAMP 2025</h1>
        </div>
        <div>
          <button onClick={() => addToDb(testData)}>Add to db</button>

          <table className="">
            {data.map((item, index) => ScoreItemComponent(index, item))}
          </table>

          <Link href="/forms">Go to form</Link>
        </div>
      </main>
    </RootLayout>
  );
}
