const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const videosRoutes = require("./routes/videos");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/videos", videosRoutes);

app.use("/", videosRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
