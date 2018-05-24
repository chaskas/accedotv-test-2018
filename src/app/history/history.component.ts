import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  uid: string;
  movies: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {

    // Rescata uid desde localStorage
    this.uid = localStorage.getItem('uid');

    // Obtiene historial de peliculas vistas desde Firebase
    this.movies = this.db.list('users/' + this.uid + '/history').valueChanges();
  }

}
