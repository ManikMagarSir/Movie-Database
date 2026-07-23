import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    comment: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1888, "Year must be after 1888"],
      max: [new Date().getFullYear() + 5, "Year cannot be in the far future"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    synopsis: {
      type: String,
      required: [true, "Synopsis is required"],
      trim: true,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    reviews: [reviewSchema],
    poster: {
      type: String,
      default: null,
    },
    cast: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
