require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const cookieParser = require("cookie-parser");
const express = require("express");
const removeHeader = require("./middlewares/removeHeader");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://whale2024.crabdance.com",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(removeHeader);
const pathToDist = path.join(__dirname, "dist");
app.use(express.static(path.join(pathToDist)));
app.use("/api/v1", apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(pathToDist + "/index.html", (err) => {
    if (err) {
      console.log("Error sending file", err);
    } else {
      console.log("OK!", pathToDist);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
