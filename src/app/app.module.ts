import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { AppComponent } from './app.component';
import { MovieService } from './movie.service';
import { ViewerComponent } from './viewer/viewer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingModule } from './routing/routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'accedo-test-2018'),
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    MovieService,
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
