import { FormEvent } from "react";
import { ScoreItem, TeamName } from "../../lib/definitions";

export default function Forms() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const color = formData.get("color") as TeamName;
    let scoreItem = new ScoreItem();
    const response = await fetch("http://localhost:3000/api/score-items", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <h1>Forms</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="color" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
