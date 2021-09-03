const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const path = require("path");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const homepageRouter = require("./routes/home");
const estatesRouter = require("./routes/estates")

app.use('/', homepageRouter)
app.use("/admin", estatesRouter)

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT} address : http://localhost:${PORT}/`);
});
