const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
mongoose.set('useUnifiedTopology', true);

dotenv.config();

//db connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(()=>console.log("Database connected"));

mongoose.connection.on("error", err => console.log(`DB error : ${err.message}`));

const postRoutes = require("./routes/post");


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Node app listening on port : ${port}`);
});

