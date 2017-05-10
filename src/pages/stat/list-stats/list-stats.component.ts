import { Component, OnInit } from "@angular/core";
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Stat } from '../../../classes/stat.class';

@Component({
    selector: 'list-stats',
    templateUrl: 'list-stats.view.html'
})
export class ListStatsComponent implements OnInit {
    /* Variables */
    public stats: Stat[] = null;
    public game_id: string = null;
    constructor(
        public storage: Storage,
        public navParams: NavParams) { }

    ngOnInit(): void {
        this.game_id = this.navParams.get('game_id');
        this.load_stats();
    }

    load_stats() {
        this.storage.get(this.game_id).then((res) => {
            let game = JSON.parse(res);
            this.stats = game.stats;
        });
    }
}