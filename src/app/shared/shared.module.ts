import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@app/shared/pipies/pipes.module';
import { DirectivesModule } from '@app/shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,

    // Pipe
    PipesModule,

    // Directives
    DirectivesModule
  ]
})
export class SharedModule {
}
