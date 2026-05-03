import mongoose from "mongoose";
import slugify from "slugify";

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour name is required"],
    unique: true,
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
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
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
  console.log(docs);
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;