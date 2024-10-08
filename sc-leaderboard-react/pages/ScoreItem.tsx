import { ScoreItem } from "../lib/definitions";

export default function ScoreItemComponent(index: number, props: ScoreItem) {
  return (
    <tr key={index} className={props.colorClass}>
      <td className="number">{index + 1}</td>
      <td className="name">{props.name}</td>
      <td className="points">{props.points}</td>
    </tr>
  );
}
