import ScoreItemComponent, { ScoreItem } from "@/components/ScoreItem";

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

export default function Home() {
  return (
    <main>
    <div id="header" className="text-grey-200">
      <h1>SUMMERCAMP 2025</h1>
    </div>
    <div id="leaderboard">
      <div className="ribbon"></div>
      <table>
          { items.map((item, index) => (ScoreItemComponent(index, item))) }
      </table>
    </div>
  </main>
  );
}
