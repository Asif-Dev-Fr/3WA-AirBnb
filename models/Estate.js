const fs = require("fs");
module.exports = class Estate {
  constructor({ name, address, zipCode, country, createdDate, id, lat, lng }) {
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.country = country;
    this.createdDate = createdDate;
    this.id = id;
    this.lat = lat;
    this.lng = lng;
  }
  // new Product({obj})

  save() {
    estates.push(this);
  }

  static fetchAll() {
    fs.readFile(
      path.join(__dirname, "../dataJson/estates.json"),
      (err, result) => {
        if (err) return console.log(err);
        return result;
      }
    );
  }
};
