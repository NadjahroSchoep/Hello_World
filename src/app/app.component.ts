import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StreamI18nService } from 'stream-chat-angular';
import { StreamService } from './services/stream.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private stream: StreamI18nService
  ) {}

  ngOnInit() {
    var email = "";

    this.auth.user$.subscribe(user => {
      if (user && user.name) {
        email = user.name;
        this.api.getToken(email);
        this.api.addUser(email);
        this.api.addUser(email+'2');
        this.api.getChannel('messaging', 'testChannel', email, email+'2');
        this.api.addMessage('messaging', 'testChannel', email, 'Test msg');
        this.api.getChannel('messaging', 'testChannel', email, email+'2');
        console.log(user.email);
      } else {
        console.log('User not available or name is undefined');
      }
    });
  }
}
