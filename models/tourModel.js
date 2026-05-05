import mongoose from "mongoose";
import slugify from "slugify";

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour name is required"],
    unique: true,
    trim: true,
    minLength: [10, "Tour name has to be longer than 10 characters"],
    maxLength: [40, "A tour name can not be longer than 40 characters"],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, "A tour duration is required"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour difficulty is required"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty can be easy, medium or difficult",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Ratings Average must be at least 1"],
    max: [5, "Ratings Average can not be more than 5"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour price is required"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour summary is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", async function() {
  this.slug = slugify(this.name, { lower: true });
});

// tourSchema.post("save", async function (doc) {
//   console.log(doc);
// });

tourSchema.pre(/^find/, async function () {
  this.where({ secretTour: { $ne: true } });
  this.start = Date.now();
});

tourSchema.post(/^find/, async function (docs) {
  console.log(`Query took ${Date.now() - this.start}ms`);
});

tourSchema.pre("aggregate", async function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;