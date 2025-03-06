import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPlayerComponent } from './components/card-player/card-player.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MediaPlayerComponent,
    CardPlayerComponent,
    SectionGenericComponent,
  ],

  imports: [
    CommonModule,
    RouterModule
  ],

  exports: [
    MediaPlayerComponent,
    CardPlayerComponent,
    SectionGenericComponent,
  ]
})
export class SharedModule { }
