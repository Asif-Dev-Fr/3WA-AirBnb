const express = require("express");
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

// view engine setup
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
  store: MongoStore.create({mongoUrl: process.env.CONNECTION_URL, collectionName: "sessions"})
}));
app.use((req, res, next) => {
  console.log(req.session);
  next();
})
require('./src/config/passport');
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate('session'));

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});




const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates");
const usersRouter = require("./src/routes/users");

// mongoose.set('useFindAndModify', false);

/**
 * ---------- PASSEPORT AUTHENTICATION ----------
 */

// Require the entire Passport config module so app.js knows about it

/**
 * ---------- ROUTES ----------
 */

app.use('/', homepageRouter);
app.use("/admin", estatesRouter);
app.use("/user", usersRouter);

// app.get('/test', (req, res)=> {
//   // console.log(req.session.cookie = req.session.user);
// })

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT} address : http://localhost:${PORT}/`);
});
