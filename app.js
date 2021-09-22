const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates")
const usersRouter = require("./src/routes/users")

app.use('/', homepageRouter)
app.use("/admin", estatesRouter)
app.use("/user", usersRouter)

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