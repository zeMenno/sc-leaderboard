import ScoreItemComponent, { ScoreItem } from "@/components/ScoreItem";

const items: ScoreItem[] = [
  { colorClass: "bg-red-500", points: 10 },
  { colorClass: "bg-blue-500", points: 20 },
  { colorClass: "bg-green-500", points: 30 },
  { colorClass: "bg-yellow-500", points: 40 }
]

export default function Home() {
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-4xl w-full text-gray-700">
      <h1 className="text-5xl font-bold mb-4 text-center">SUMMERCAMP 2025</h1>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-lg">Welkom op SUMMERCAMP 2025!</p>
        <p className="text-lg">We zijn blij dat jullie er zijn</p>

        { items.map((item, index) => (ScoreItemComponent(index, item))) }

      </div>
    </div>
  </div>
  );
}
