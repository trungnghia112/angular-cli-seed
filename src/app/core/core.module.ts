import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { RouterEffects } from '@app/core/states/effects/router';
import { metaReducers, reducers } from '@app/core/states/reducers';
import { CustomSerializer } from '@app/core/states/utils/utils';

import { HttpTokenInterceptor } from '@app/core/interceptors/http.token.interceptor';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { ClientDetectorService } from '@app/core/services/client-detector.service';
import { ApiService } from '@app/core/services/api.service';
import { UserService } from '@app/core/services/user.service';

export function getInitialState() {
  return LocalStorageService.loadInitialState();
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot(),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer' // name of reducer key
    }),

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {initialState: getInitialState, metaReducers: metaReducers}),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([
      RouterEffects
    ]),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  declarations: [],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true, // option. This is required and tells Angular that HTTP_INTERCEPTORS is an array of values, rather than a single value.
    },
    LocalStorageService,
    ClientDetectorService,
    ApiService,
    UserService
  ]
})
export class CoreModule {
  constructor(@Optional()
              @SkipSelf()
                parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
