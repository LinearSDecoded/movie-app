import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genres: string[] = [];
  languages: string[] = [];
  searchQuery: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies: Movie[]) => {  
        this.movies = movies;

        const genreSet = new Set<string>();
        movies.forEach(movie => {
          if (movie.Genre) {
            if (Array.isArray(movie.Genre)) {
              movie.Genre.forEach(g => {
                g.split(',').forEach((genre: string) => genreSet.add(genre.trim()));
              });
            } else {
              movie.Genre.split(',').forEach((genre: string) => genreSet.add(genre.trim()));
            }
          }
        });
        this.genres = Array.from(genreSet);

        const languageSet = new Set<string>();
        movies.forEach(movie => {
          if (movie.Language) {
            movie.Language.split(',').forEach((language: string) => languageSet.add(language.trim()));
          }
        });
        this.languages = Array.from(languageSet);
      },
      error: (error: any) => {
        console.error("Error fetching movies:", error);
      }
    });
  }

  searchMovies() {
    const query = this.searchQuery;
    const selectedLanguage = this.selectedLanguage;
    const selectedGenre = this.selectedGenre

    this.movieService.searchMovies(query, selectedGenre, selectedLanguage).subscribe({
      next: (movies: Movie[]) => {
        this.filteredMovies = movies;
      },
      error: (error) => {
        console.error("Error searching movies:", error);
      }
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.selectedGenre = '';
    this.selectedLanguage = '';
    this.searchMovies();
  }
}
