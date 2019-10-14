const express = require("express");
const app = express();
const morgan = require("morgan");

const postRoutes = require("./routes/post");
const myOwnMiddleware = (req,res,next) =>{
    console.log("middleware running!!!");
    next();
};

app.use(morgan("dev"));
app.use(myOwnMiddleware);

app.use('/', postRoutes);

const port = 8080;
app.listen(port, ()=>{
    console.log(`Node app listening on port : ${port}`);
});

