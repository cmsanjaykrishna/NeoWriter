const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");

mongoose.set('useUnifiedTopology', true);

dotenv.config();

//db connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => console.log("Database connected"));

mongoose.connection.on("error", err => console.log(`DB error : ${err.message}`));

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//apiDocs
app.get("/", (req,res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "Unauthorised user" });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node app listening on port : ${port}`);
});