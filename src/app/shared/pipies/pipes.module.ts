import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupByMapPipe } from '@app/shared/pipies/group-by-map.pipe';
import { KeysPipe } from '@app/shared/pipies/keys.pipe';
import { KeyToValuePipe } from '@app/shared/pipies/keyToValue.pipe';
import { BytesPipe } from '@app/shared/pipies/bytes.pipe';
import { SafeHtmlPipe } from '@app/shared/pipies/safeHtml.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GroupByMapPipe,
    KeysPipe,
    KeyToValuePipe,
    BytesPipe,
    SafeHtmlPipe,
  ],
  exports: [
    GroupByMapPipe,
    KeysPipe,
    KeyToValuePipe,
    BytesPipe,
    SafeHtmlPipe,
  ],
  providers: []
})

export class PipesModule {
}
