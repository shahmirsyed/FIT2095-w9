import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  section = 1;
  title: string = "";
  year: number = 0;
  movieId: string = "";
  aYear: number = 0;

  constructor(private dbService: DatabaseService) { }

  //get movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovies() {
    // update the movies db
    this.onGetMovies();
    let toDelete: any[] = []
    
    for(let i =0; i < this.moviesDB.length; i++){
      if (this.moviesDB[i].year < this.aYear){
        toDelete.push(this.moviesDB[i])
      }
    }
    // call onDeleteMovie for each item/movie
    toDelete.forEach(movie => this.onDeleteMovie(movie));
  }

  //use the same change section function to shift between sections and reset values each time section is changed
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.aYear = 0;
  }

  ngOnInit(): void {
    this.onGetMovies();
  }
  

}
