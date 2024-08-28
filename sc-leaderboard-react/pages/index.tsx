import ScoreItemComponent from "../components/ScoreItem";
import { useEffect, useState } from "react";
import RootLayout from "../components/layout";
import Link from "next/link";
import { ScoreItem, TeamName } from "../lib/definitions";
import { sql } from "@vercel/postgres";

export default function App() {
  const [data, setData] = useState<ScoreItem[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${window.location.host}/api/activity`)
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
