export type ScoreItem = {
  nameOfActivity: string;
  scorePerTeam: ScorePerTeam[];
  dateOfActivity: Date;
};

export type ScorePerTeam = {
  points: number;
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
