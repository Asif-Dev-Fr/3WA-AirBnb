const estates = [];
module.exports = class Estate {
    constructor({name, address, zipCode, country, createdDate, id, lat, lng}) {
        this.name = name
        this.address = address
        this.zipCode = zipCode
        this.country = country
        this.createdDate = createdDate
        this.id = id
        this.lat = lat
        this.lng = lng
    }
        // new Product({obj})

    save() {
        estates.push(this);
    }

    static fetchAll() {
        return estates;
    }
}