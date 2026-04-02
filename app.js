import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});