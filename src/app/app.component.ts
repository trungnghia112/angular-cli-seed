import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private swUpdate: SwUpdate) {
    console.log(environment);

    // check back to the server to see if a new ngsw.json is available
    // this can be called inside setInterval, upon router navigation, etc.
    // this.swUpdate.checkForUpdate();

    this.swUpdate.available.subscribe(() => {
      if (confirm('New version available. Load New Version?')) {
        window.location.reload();
      }
    });
  }
}
