import { ScoreItem } from "../lib/definitions";

export default function ScoreItemComponent(index: number, props: ScoreItem) {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{props.nameOfActivity}</td>
    </tr>
  );
}
