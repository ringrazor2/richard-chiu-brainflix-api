const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
