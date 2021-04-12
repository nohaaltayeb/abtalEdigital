const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/routes");
const users = require("./routers/userRoute")
const categories = require("./routers/categoryRoute")
const items = require("./routers/itemRoute")

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',users);
app.use('/',routes);
app.use('/',items);
app.use('/',categories);
app.get('/ping',(req,res,next)=>{
    res.send('pong')

})




app.listen(4000, 
    console.log("server is running on port 4000")
);