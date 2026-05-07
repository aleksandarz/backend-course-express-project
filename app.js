import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

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

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = "fail";

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
