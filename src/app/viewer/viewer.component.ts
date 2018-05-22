import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { VgAPI } from 'videogular2/core';

import { MovieService } from '../movie.service';
import { Movie } from '../movie';

export enum KEY_CODE {
  ESCAPE = 27
}

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  movie: Movie;

  api: VgAPI;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movie = this.movieService.getMovie();
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().currentTime = 0;
    this.api.play();

    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      () => {
        console.log('timeUpdate'); // TODO: Actualizar lastSeenTime
      }
    );

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        this.router.navigate(['home']);
      }
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.router.navigate(['home']);
    }
  }

}
