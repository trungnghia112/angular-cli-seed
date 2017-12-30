import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyToValuePipe } from './keyToValue.pipe';
import { BytesPipe } from './bytes.pipe';
import { SafeHtmlPipe } from './safeHtml.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeyToValuePipe,
    BytesPipe,
    SafeHtmlPipe,
  ],
  exports: [
    KeyToValuePipe,
    BytesPipe,
    SafeHtmlPipe,
  ],
  providers: []
})

export class PipesModule {
}
