const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Estate = require('../models/Estate');


const path = require("path");

router.get("/add-estate", (req, res, next) => {
  res.render("form");
});

router.post("/add-estate", (req, res, next) => {
  console.log(req.body);
  fs.readFile(path.join(__dirname, '../dataJson/estates.json'), "utf8", (err, data) => {
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
    };

    estateObj.push(newEstateObj);

    let newEstate = new Estate(newEstateObj);
    console.log(newEstate);

    const newData = JSON.stringify(estateObj, null, 2);

    fs.writeFile(path.join(__dirname, '../dataJson/estates.json'), newData, (err) => {
      if (err) return res.status(400).send("Something went wrong");
      res.status(201).send("Card created succesfully");
    });
  });
});

module.exports = router;
