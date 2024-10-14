import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
declarations: [
    AppComponent,
    MovieListComponent,
    HighlightPipe
],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
