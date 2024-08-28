import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = "42069";

app.listen(PORT, () => {
  console.log(`Server is running on a nice port ${PORT}`);
});
