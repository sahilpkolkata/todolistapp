const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/dev");

const todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",todoRoutes);

//Connect to Local Mongo Server
// mongoose.connect(config.local_URL,{useNewUrlParser:true}).catch(err=>{
//  console.log(err);
// });

//Connect to MongoDb Cluster
mongoose.connect(config.DB_URL,{useNewUrlParser:true}).catch(err=>{
    console.log(err);
   });

const PORT = process.env.PORT || 3000;



app.listen(PORT,function(){
    console.log("App is running");
});