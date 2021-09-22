const mongoose = require("mongoose");

const EstateSchema = new mongoose.Schema({
    name: String,
    address: String,
    price: Number,
    zipCode: String,
    country: String,
    // createdAt: { type: Date, default: new Date() },
    lat: {
      type: Number,
      default: 48.866667,
    },
    lng: {
      type: Number,
      default: 2.333333,
    },
  },
  { timestamps: true }
);

const Estate = mongoose.model('Estate', EstateSchema );

module.exports = Estate;

// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
// module.exports = class Estate {
//   constructor({ name, address, zipCode, country, createdDate, id, lat, lng }) {
//     this.name = name;
//     this.address = address;
//     this.zipCode = zipCode;
//     this.country = country;
//     this.createdDate = createdDate;
//     this.id = id;
//     this.lat = lat;
//     this.lng = lng;
//   }

//   save() {
//     fs.readFile(path.join(__dirname, '../dataJson/estates.json'), "utf8", (err, data) => {

//     let estateObj = []
//     estateObj = JSON.parse(data);

//     const currentTime = Date.now();
//     const id = uuidv4();

//     let newEstateObj = {
//       ...this,
//       createdDate: currentTime,
//       id,
//       lat: "11111",
//       lng: "1111",
//     };

//     estateObj.push(newEstateObj);

//     const newData = JSON.stringify(estateObj, null, 2);

//     fs.writeFile(path.join(__dirname, '../dataJson/estates.json'), newData, (err) => {
//       if (err) console.log('ERREUR !', err)
//     });
//   });
//   }

//   static fetchAll = () => {
//     const estates = fs.readFileSync(path.join(__dirname, "../dataJson/estates.json"))
//     return JSON.parse(estates)
//   }
// };
