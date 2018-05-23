import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';

declare var $: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movies: Movie[];

  slides: Array<Array<Movie>>;

  selectedMovie: Movie;

  slideIndex: number;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.slides = new Array<Array<Movie>>();
    localStorage.setItem('currentSlideIndex', '0');
  }

  ngOnInit() {
    this.movieService.getMovies().then(response => this.getMoviesSuccess(response as Movie[]), error => this.getMoviesFailed());
    $('#carousel').on('slide.bs.carousel', function (e) {
      localStorage.setItem('currentSlideIndex', e.to);
    });
  }

  getMoviesSuccess(movies: Movie[]) {
    const total_slides = Math.ceil(movies.length / 6);
    let j = 0;
    for (let i = 0; i < total_slides; i++) {
      this.slides.push(movies.slice(j, j + 6));
      j += 6;
    }
  }

  setMovie(movie: Movie) {
    this.movieService.setMovie(movie);
  }

  getMoviesFailed() {
    console.log('An error occurred');
  }

  setFocus(movie) {
    this.selectedMovie = movie;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.slideIndex = Number(localStorage.getItem('currentSlideIndex'));
      $('#carousel').carousel('pause');
      if (!this.selectedMovie) {
        this.selectedMovie = this.slides[this.slideIndex][0];
      } else {
        let selectedMovieIndex = this.slides[this.slideIndex].indexOf(this.selectedMovie) + 1;
        if (selectedMovieIndex >= this.slides[this.slideIndex].length) {
          selectedMovieIndex = 0;
          this.slideIndex++;
          if (this.slideIndex >= this.slides.length) {
            this.slideIndex = 0;
          }
        }
        this.selectedMovie = this.slides[this.slideIndex][selectedMovieIndex];
        if (selectedMovieIndex % 6 === 0) {
          $('#carousel').carousel('next');
        }
      }
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.slideIndex = Number(localStorage.getItem('currentSlideIndex'));
      $('#carousel').carousel('pause');
      if (!this.selectedMovie) {
        $('#carousel').carousel('prev');
        this.slideIndex = Number(localStorage.getItem('currentSlideIndex'));
        this.selectedMovie = this.slides[this.slideIndex][5];
      } else {
        let selectedMovieIndex = this.slides[this.slideIndex].indexOf(this.selectedMovie) - 1;
        if (selectedMovieIndex < 0) {
          selectedMovieIndex = this.slides[this.slideIndex].length - 1;
          this.slideIndex--;
          if (this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
          }
        }
        this.selectedMovie = this.slides[this.slideIndex][selectedMovieIndex];
        if (selectedMovieIndex % 6 === 5) {
          $('#carousel').carousel('prev');
        }
      }
    }

    if (event.keyCode === KEY_CODE.ENTER) {
      if (this.selectedMovie) {
        this.setMovie(this.selectedMovie);
        this.router.navigate(['watch', this.selectedMovie.id]);
      }
    }
  }

}
