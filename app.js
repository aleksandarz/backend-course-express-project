import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// const __dirname = import.meta.dirname;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// Serving public data from files
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getSingleTour);
// app.post("/api/v1/tours", createNewTour);
// app.patch("/api/v1/tours/:id", updateTourWithPatch);
// app.delete("/api/v1/tours/:id", deleteTour);

// Refactored routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
