import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    EffectsModule.forRoot([
    ]),

    // Signature matches AppState interface
    StoreModule.forRoot({
    }),

    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [
  ],
})
export class AppStateModule {
}
