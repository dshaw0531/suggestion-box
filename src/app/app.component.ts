import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  items: FirebaseListObservable<any[]>;
  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
