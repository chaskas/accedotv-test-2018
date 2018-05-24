import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../shared/model/movie';
import { MovieService } from '../shared/movie.service';

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

  // Contiene el listado de peliculas
  movies: Movie[];

  // Contiene las slides
  slides: Array<Array<Movie>>;

  // Contiene la pelicula seleccionada
  selectedMovie: Movie;

  // Contiene la slide actual
  slideIndex: number;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.slides = new Array<Array<Movie>>();
    localStorage.setItem('currentSlideIndex', '0');
  }

  // Obtiene las peliculas desde el servicio y las almacena en this.movies
  // además, se declara un listener que mantiene el slide actual en localStorage
  ngOnInit() {
    this.movieService.getMovies().then(response => this.getMoviesSuccess(response as Movie[]), error => this.getMoviesFailed());
    $('#carousel').on('slide.bs.carousel', function (e) {
      localStorage.setItem('currentSlideIndex', e.to);
    });
  }

  // Reorganiza las peliculas en slides para mostrar correctamente en vista
  getMoviesSuccess(movies: Movie[]) {
    const total_slides = Math.ceil(movies.length / 6);
    let j = 0;
    for (let i = 0; i < total_slides; i++) {
      this.slides.push(movies.slice(j, j + 6));
      j += 6;
    }
  }

  // Setea la actual movie
  setMovie(movie: Movie) {
    this.movieService.setMovie(movie);
  }

  getMoviesFailed() {
    console.log('An error occurred');
  }

  setFocus(movie) {
    this.selectedMovie = movie;
  }

  // Si falla la carga de la imagen la reemplaza por un holder
  onImageError(image:any) {
    image.src='https://imgplaceholder.com/214x317?text=Ups...&font-size=18';
  }

  // Se declara listener para eventos de teclado
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    // Tecla Flecha derecha
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.slideIndex = Number(localStorage.getItem('currentSlideIndex'));

      // Detiene el carousel
      $('#carousel').carousel('pause');

      // Para manejo de la pelicula seleccionada y slide actual
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

    // Tecla Flecha izquierda
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.slideIndex = Number(localStorage.getItem('currentSlideIndex'));
      
      // Detiene el carousel
      $('#carousel').carousel('pause');

      // Para manejo de la pelicula seleccionada y slide actual
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

    // Tecla Enter
    if (event.keyCode === KEY_CODE.ENTER) {
      if (this.selectedMovie) {

        // Setea la pelicula seleccionada e inicia visor
        this.setMovie(this.selectedMovie);
        this.router.navigate(['watch', this.selectedMovie.id]);
      }
    }
  }

}
