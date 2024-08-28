import { ScoreItem, TeamName } from "../lib/definitions";

function getTotalPointsPerTeam(
  data: ScoreItem[],
): { team: string; points: number }[] {
  const allScores = data.flatMap((item) => item.scorePerTeam);
  const teamNames = allScores.map((item) => item.team);
  const uniqueTeamNames = Array.from(new Set(teamNames));
  const teamScores = uniqueTeamNames.reduce(
    (acc, team) => {
      const teamScore = allScores
        .filter((item) => item.team === team)
        .reduce((acc, item) => acc + item.points, 0);
      acc.push({ team, points: teamScore });
      return acc;
    },
    [] as { team: string; points: number }[],
  );

  const orderedTeamScores = teamScores.sort((a, b) => b.points - a.points);
  return orderedTeamScores;
}

export default function ScoreItemComponent(data: ScoreItem[]) {
  return getTotalPointsPerTeam(data).map((team) => (
    <tr key={team.team}>
      <td>{team.team}</td>
      <td>{team.points}</td>
    </tr>
  ));
}
