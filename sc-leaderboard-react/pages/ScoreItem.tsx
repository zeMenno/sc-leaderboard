import { ScorePerTeam } from "../lib/definitions";

export default function ScoreItemComponent(index: number, props: ScorePerTeam) {
  return (
    <tr key={index} className={props.colorClass}>
      <td className="number">{index + 1}</td>
      <td className="name">{props.name}</td>
      <td className="points">{props.points}</td>
    </tr>
  );
}
