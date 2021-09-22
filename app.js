const express = require("express");
const app = express();
// const multer  = require('multer')
const PORT = 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));

const homepageRouter = require("./src/routes/home");
const estatesRouter = require("./src/routes/estates")
const usersRouter = require("./src/routes/users")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '/upload')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })
// const upload = multer({ storage: storage })

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

// app.post('upload', upload.single('image'), (req, res) => {
//   console.log(req.file);
// })
