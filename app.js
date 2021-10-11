const express = require("express");
const app = express();
const chalk = require('chalk');
const mongoose = require("mongoose");
const path = require('path')
const PORT = 3000;
const expressLayouts = require('express-ejs-layouts');

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
const publicFolder = path.join(__dirname,'public')
app.use(express.static(publicFolder));
app.use('/admin',express.static(publicFolder));
app.use('/user',express.static(publicFolder));
// console.log(chalk.bgGreen(path.join(__dirname,'public')))


// Set view engine and default layout
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set('layout', './layouts/guest-layout')
/*  To use another layout for one specific route place attribute in render
res.render("estates/form-estate", {
    layout: './layouts/admin-layout'
  });  */

// Router
const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates")
const usersRouter = require("./src/routes/users")

app.use('/', homepageRouter)
app.use("/admin", estatesRouter)
app.use("/user", usersRouter)


// MONGO BDD
const CONNECTION_URL = "mongodb+srv://root:IKEU2M0Wa9xgxgOM@rbnb.ftcnl.mongodb.net/test";
/* const CONNECTION_URL = "mongodb+srv://arinodebnb:arinodebnb@cluster0bnb.xxjlp.mongodb.net/estates"; */

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// mongoose.set('useFindAndModify', false);

mongoose.connection.once('open', () => {
    console.log(chalk.cyanBright('Connected to MongoDB'));
});


app.listen(PORT, () => {
  console.log(chalk.bgBlue(`🌍 Server running at port ${PORT} address : http://localhost:${PORT}/`));
});


// 46VJqTc4rET73eBt