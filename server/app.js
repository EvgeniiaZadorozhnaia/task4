require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const cookieParser = require("cookie-parser");
const express = require("express");
const removeHeader = require("./middlewares/removeHeader");
const path = require("path");

const app = express();
const PORT = process.env.PORT_PROD;

const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors(corsConfig));
app.use(removeHeader);
const pathToDist = path.join(__dirname, "dist");
app.use(express.static(path.join(pathToDist)));
app.use("/api/v1", apiRouter);

app.use("*", (req, res) => {
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
