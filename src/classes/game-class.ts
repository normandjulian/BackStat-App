export class Game {
    constructor(
        public _id: string,
        public opponent: string,
        public date: Date,
        public home: boolean,
        public team_id: string
    ){}
}
