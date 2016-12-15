export class Stat {
    constructor(
        public _id: string,
        public area: number,
        public time: string,
        public action: string,
        public player_id: string,
        public game_id: string,
        public team_id: string
    ){}
}
