import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public afAuth: AngularFireAuth
  ) {

    this.afAuth.auth.signInAnonymously().catch(function(error) {

      const errorCode = error.code;
      const errorMessage = error.message;

    });

    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {

        const isAnonymous = user.isAnonymous;
        const uid = user.uid;

        localStorage.setItem('uid', uid);
        console.log('User is signed in. anonymously: ' + isAnonymous + ' uid: ' + uid);

      } else {
        console.log('User is signed out.');
      }

    });

  }

}
