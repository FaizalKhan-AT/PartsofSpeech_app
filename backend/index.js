const express = require("express");
const app = express();
const cors = require("cors");
const Analyse = require("./Routes/analyse");
require("dotenv").config();

app.use(express.text({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use("/api/v1/", Analyse);
app.listen(
  process.env.PORT,
  console.log(`server started running at ${process.env.PORT} `)
);
