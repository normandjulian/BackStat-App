import { Component,
         OnInit }           from '@angular/core';
import { NavController }    from 'ionic-angular';
import { DashboardService } from './dashboard-service';
import { TeamInt }          from '../../classes/team-class';

import { Team }             from '../team/team';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers : [ DashboardService ]
})

export class Dashboard implements OnInit {
  private teams: TeamInt[] = null;
  constructor(
    private navController: NavController,
    private dashboardService: DashboardService ) {}

  ngOnInit () {
    this.dashboardService.get_teams().subscribe(
      res => this.teams = res,
      err => console.error( err )
    )
  };

  manage_team( _id ) {
    let id = ( typeof _id !== 'undefined' ) ? _id : null;
    this.navController.push( Team, { _id: id } );
  };
}
