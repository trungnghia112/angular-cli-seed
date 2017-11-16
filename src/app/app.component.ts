import { Component } from '@angular/core';
import { environment } from '@env/environment';
// import { loadCSS } from 'fg-loadcss';
// loadCSS( 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css' );

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
    console.log(environment);
  }
}
