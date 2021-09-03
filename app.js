const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const Estate = require('./models/Estate');
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
  fs.readFile("./dataJson/estates.json", (err, result) => {
    if (err) return console.log(err);
    return res.render("homepage", { estates: JSON.parse(result) });
  });
});

app.get("/add-estate", (req, res, next) => {
  res.render("form");
  // next();
});
app.post("/add-estate", (req, res, next) => {
  console.log(req.body);
  fs.readFile("./dataJson/estates.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Something went wrong");

    estateObj = JSON.parse(data);
    const currentTime = Date.now();
    const id = uuidv4();

    let newEstateObj = {
      ...req.body,
      createdDate: currentTime,
      id,
      lat: "11111",
      lng: "1111",
    }

    estateObj.push(newEstateObj);

    let newEstate = new Estate(newEstateObj)
    console.log(newEstate);

    const newData = JSON.stringify(estateObj, null, 2);

    fs.writeFile("./dataJson/estates.json", newData, (err) => {
      if (err) return res.status(400).send("Something went wrong");
      res.status(201).send("Card created succesfully");
    });
  });
});

// title, name, address, zipCode, country, createdDate, id, lat


app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});
