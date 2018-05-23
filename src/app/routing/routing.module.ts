import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PlayerComponent } from '../player/player.component';
import { HistoryComponent } from '../history/history.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'watch/:id', component: PlayerComponent },
  { path: 'history', component: HistoryComponent }
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
