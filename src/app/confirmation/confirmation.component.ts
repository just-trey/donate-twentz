import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  total: number;
  type: string;
  user: Observable<firebase.User>;

  pushError = false;
  checkPayment = false;
  sub: any;

  constructor(private route: ActivatedRoute, private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase, private storage: LocalStorageService) {
    this.user = this.fireAuth.authState;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.total = params['total'];
      this.type = params['type'];

      if (this.type) {
        this.checkPayment = true;
      }
    });
    console.log('1. Auth');

    this.fireAuth.auth.signInAnonymously()
      .then(success => this.pushData())
      .catch(err => this.handleError(err));

    // Below is how to get data from Firebase. Just saving for reference
    // this.golfTeams = db.list('/golfTeams');
    // console.log(this.golfTeams.subscribe(val => console.log(val[0][0].firstName)));

  }

  pushData() {
    console.log('2. Push');
    // push data to firebase from local storage
    firebase.database().ref('/golfTeams')
      .push(this.storage.retrieve('registrationInfo'))
      .then(success => this.cleanup());
      // .catch(err => this.handleError(err));
  }

  cleanup() {
    // clean out session storage
    this.storage.clear('registrationInfo');
    this.fireAuth.auth.signOut();
    console.log('3. Clean');
  }

  handleError(err) {
    console.log('Failed: ' + err);
    console.log('X. Error');
    this.pushError = true;
    this.cleanup();
  }

}
