export type ScoreItem = {
  colorClass: string;
  points: number;
  name: string;
  team: TeamName;
};

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
