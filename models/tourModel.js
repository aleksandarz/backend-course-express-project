import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A tour name is required"], unique: true },
  rating: { type: Number, required: false, default: 4.5 },
  price: { type: Number, required: [true, "A tour price is required"] },
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;