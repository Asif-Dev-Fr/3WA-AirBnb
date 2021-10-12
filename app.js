// Packages import
require("dotenv").config();
const flash = require('connect-flash');
const express = require("express");
const passport = require('passport');
const path = require('path');
const session = require("express-session")
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const app = express();
const chalk = require('chalk');
const expressLayouts = require('express-ejs-layouts');





// Routes imports
const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates");
const usersRouter = require("./src/routes/users");
const apiRouter = require("./src/routes/api")

// Constant
const PORT = 3000;

/**
 * ---------- VIEW ENGINE SETUP ----------
 */
app.set("view engine", "ejs");
app.set("views", "./src/views");

// ---------- Set view engine and default layout ----------
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set('layout', './layouts/guest-layout')
/*  To use another layout for one specific route place attribute in render
res.render("estates/form-estate", {
    layout: './layouts/admin-layout'
  });  */


/**
 * ---------- SERVE STATIC FILES ----------
 */
const publicFolder = path.join(__dirname,'public')
app.use(express.static(publicFolder));
app.use('/admin',express.static(publicFolder));
app.use('/user',express.static(publicFolder));


/**
 * ---------- EXPRESS AND SESSION SETUP ----------
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: MongoStore.create({mongoUrl: process.env.CONNECTION_URL, collectionName: "sessions"})
}));
app.use((req, res, next) => {
  // console.log(res.app.locals);
  next();
})

/**
 * ---------- PASSEPORT AUTHENTICATION ----------
 */


// MONGO BDD
const CONNECTION_URL = "mongodb+srv://root:IKEU2M0Wa9xgxgOM@rbnb.ftcnl.mongodb.net/test";
/* const CONNECTION_URL = "mongodb+srv://arinodebnb:arinodebnb@cluster0bnb.xxjlp.mongodb.net/estates"; */
// Require the entire Passport config module so app.js knows about it
require('./src/config/passport');
app.use(passport.initialize());
app.use(passport.session());

/**
 * ---------- MONGOOSE CONNECTION ----------
 */
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log(chalk.cyanBright('Connected to MongoDB'));
});

app.use(flash());

/**
 * ---------- ROUTES ----------
 */
app.use('/', homepageRouter);
app.use("/admin", estatesRouter);
app.use("/user", usersRouter);
app.use("/api", apiRouter)

/**
 * ---------- SERVER LISTENNING ----------
 */
app.listen(PORT, () => {
  console.log(chalk.bgBlue(`🌍 Server running at port ${PORT} address : http://localhost:${PORT}/`));
});
