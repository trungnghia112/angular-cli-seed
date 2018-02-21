import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,

    // features


    // serviceWorker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
