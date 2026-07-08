import { seedMovies } from "../models/Movie.js";

const seedData = [
  { title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont", synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
  { title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola", synopsis: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son." },
  { title: "The Dark Knight", genre: "Action", year: 2008, director: "Christopher Nolan", synopsis: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests." },
  { title: "Pulp Fiction", genre: "Crime", year: 1994, director: "Quentin Tarantino", synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
  { title: "Inception", genre: "Sci-Fi", year: 2010, director: "Christopher Nolan", synopsis: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
];

export function initDatabase() {
  seedMovies(seedData);
  console.log(`Seeded ${seedData.length} movies`);
}
