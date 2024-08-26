export class ScoreItem {
  private _points: number | undefined;
  private _name: string | undefined;
  private _team: TeamName | undefined;

  contructor(name: string, team: TeamName, points: number) {
    this._name = name;
    this._team = team;
    this._points = points;
  }

  get colorClass(): string {
    switch (this._team) {
      case TeamName.Red:
        return "bg-red-500";
      case TeamName.Blue:
        return "bg-blue-500";
      case TeamName.Green:
        return "bg-green-500";
      case TeamName.Yellow:
        return "bg-yellow-500";
      case TeamName.Purple:
        return "bg-purple-500";
      case TeamName.Orange:
        return "bg-orange-500";
      case TeamName.Pink:
        return "bg-pink-500";
      case TeamName.White:
        return "bg-white-500";
      default:
        return "bg-gray-500";
    }
  }
}

export enum TeamName {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
  Purple = "purple",
  Orange = "orange",
  Pink = "pink",
  White = "white",
}
