const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const homepageRouter = require("./routes/home");
const estatesRouter = require("./routes/estates")

app.use('/', homepageRouter)
app.use("/admin", estatesRouter)

const CONNECTION_URL = "mongodb+srv://root:TcKbelPoLBtE859z@rbnb.ftcnl.mongodb.net/test";

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// mongoose.set('useFindAndModify', false);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT} address : http://localhost:${PORT}/`);
});


// 46VJqTc4rET73eBt