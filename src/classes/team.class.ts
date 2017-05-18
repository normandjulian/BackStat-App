export class Team {
  _id: string;
  name: string;
  coach: string;
  period: {
    type: number,
    time: number
  };
};

export class TeamFull {
  _id: string;
  name: string;
  coach: string;
  period: {
    type: number,
    time: number
  };
  players: Array<Object>;
};
