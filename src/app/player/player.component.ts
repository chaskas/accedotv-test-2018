import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { VgAPI } from 'videogular2/core';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { MovieService } from '../shared/movie.service';
import { Movie } from '../shared/model/movie';
import { Observable } from 'rxjs';

export enum KEY_CODE {
  ESCAPE = 27
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  movie: Movie;
  api: VgAPI;
  uid: string;
  itemRef: AngularFireObject<any>;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private db: AngularFireDatabase
  ) { 
    this.uid = localStorage.getItem('uid');
    this.movie = this.movieService.getMovie();
  
    this.itemRef = this.db.object('users/' + this.uid + '/history/' + this.movie.id);
  }

  ngOnInit() {

  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    // Almacena pelicula actual en Firebase (para historial)
    this.itemRef.set({
      id: this.movie.id,
      title: this.movie.title,
      lastSeen: Date.now()
    });

    // Setea tiempo inicial en 0
    this.api.getDefaultMedia().currentTime = 0;

    // Inicia la reproduccion
    this.api.play();

    // Detecta término de película y envía al home
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        this.router.navigate(['home']);
      }
    );
  }

  // Detecta tecla escape y vuelve al home
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.router.navigate(['home']);
    }
  }

}
