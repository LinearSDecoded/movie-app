import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  searchQuery: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';

  private searchSubject = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupSearchObservable();
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setupSearchObservable(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.loadMovies();
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFilterChange(): void {
    this.loadMovies();
  }
  private loadMovies(): void {
    this.movieService.getMovies({ query: this.searchQuery, genre: this.selectedGenre, language: this.selectedLanguage })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.movies = data;
      });
  }
}
