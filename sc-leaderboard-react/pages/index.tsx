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
      <main className="max-w-sm mx-auto">
        <div id="" className="text-grey-200">
          <h1 className="text-pretty text-3xl">SUMMERCAMP 2025</h1>
        </div>
        <div>
          {isLoading ? "IS LOADING..." : undefined}
          <table className="table table-auto">
            <tbody>
              {data.map((item, index) => ScoreItemComponent(index, item))}
            </tbody>
          </table>

          <Link href="/forms">Go to form</Link>
        </div>
      </main>
    </RootLayout>
  );
}
