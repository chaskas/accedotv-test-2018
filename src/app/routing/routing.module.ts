import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PlayerComponent } from '../player/player.component';
import { HistoryComponent } from '../history/history.component';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: LayoutComponent, 
    children: [ 
      { path: 'home', component: DashboardComponent },
      { path: 'watch/:id', component: PlayerComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }
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
