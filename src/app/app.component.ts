import { Component, AfterViewInit } from '@angular/core';
import { environment } from '@env/environment';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  constructor(private swUpdate: SwUpdate) {
    console.log(environment);
  }

  ngAfterViewInit() {
    // check back to the server to see if a new ngsw.json is available
    // this can be called inside setInterval, upon router navigation, etc.
    // this.swUpdate.checkForUpdate();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        // update available: ask the user to reload
        if (confirm('New version available. Load New Version?')) {
          this.swUpdate.activateUpdate()
            .then(() => document.location.reload()); // load the update
        }
      });
    }
  }
}
