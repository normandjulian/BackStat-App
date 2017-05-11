import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Stat } from '../../../classes/stat.class';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'list-stats',
    templateUrl: 'list-stats.view.html'
})
export class ListStatsComponent implements OnInit {
    /* Variables */
    public stats: Stat[] = null;
    public game_id: string = null;
    constructor(
        public viewCtrl: ViewController,
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

    dismiss() {
        this.viewCtrl.dismiss();
    }

    delete_action(stat: Stat) {
        this.storage.get(this.game_id).then((res) => {
            // debugger;
            let game = JSON.parse(res);
            let index = game.stats.length;
            while (index--) {
                if (game.stats[index]._id === stat._id) {
                    game.stats.splice(index, 1);
                }
            }
            this.storage.set( this.game_id, JSON.stringify(game));
            this.load_stats();
        });
    }
}