import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(params?: { [key: string]: string }): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl, { params: this.buildParams(params) });
  }

  getMovieById(imdbID: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${imdbID}`);
  }

  searchMovies(query: string, genre?: string, language?: string): Observable<Movie[]> {
    const params: { [key: string]: string } = {};
    if (query) params['search'] = query;
    if (genre) params['genre'] = genre;
    if (language) params['language'] = language;
    return this.http.get<Movie[]>(this.apiUrl, { params: this.buildParams(params) });
  }


  private buildParams(params?: { [key: string]: string }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return httpParams;
  }
}
