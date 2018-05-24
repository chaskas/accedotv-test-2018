import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Movie } from './model/movie';

@Injectable()
export class MovieService {

  movie: Movie;

  constructor(private httpClient: HttpClient) {}

  private url = '/api/assets/hkzxv.json';

  getMovies(): Promise<Movie[]> {
    return this.httpClient.get(this.url)
      .toPromise()
      .then(response => response['entries'] as Movie[])
      .catch(this.handleError);
  }

  setMovie(movie: Movie) {
    this.movie = movie;
    localStorage.setItem('currentMovie', JSON.stringify(this.movie));
  }

  getMovie() {
    this.movie = JSON.parse(localStorage.getItem('currentMovie'));
    return this.movie;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
