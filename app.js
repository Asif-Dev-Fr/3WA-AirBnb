// Packages import
const express = require("express");
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// Routes imports
const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates");
const usersRouter = require("./src/routes/users");

// Constant
const PORT = 3000;

/**
 * ---------- VIEW ENGINE SETUP ----------
 */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/**
 * ---------- EXPRESS AND SESSION SETUP ----------
 */
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: MongoStore.create({mongoUrl: process.env.CONNECTION_URL, collectionName: "sessions"})
}));
app.use((req, res, next) => {
  console.log(req.session);
  next();
})

/**
 * ---------- PASSEPORT AUTHENTICATION ----------
 */

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
  console.log('Connected to MongoDB');
});

/**
 * ---------- ROUTES ----------
 */
app.use('/', homepageRouter);
app.use("/admin", estatesRouter);
app.use("/user", usersRouter);

/**
 * ---------- SERVER LISTENNING ----------
 */
app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT} address : http://localhost:${PORT}/`);
});
