import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component'; // Import the main component
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
declarations: [
    AppComponent,
    MovieListComponent
],
  imports: [
    BrowserModule, // Import BrowserModule
    HttpClientModule, // Import HttpClientModule
    AppComponent,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
