var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//DB connection

const uri = process.env.ATLAS_URI;
const connect =  mongoose.connect(uri,{ useNewUrlParser: true,useCreateIndex:true}
                    );

const connection = mongoose.connection;
connection.once('open' ,() => {
    console.log("Mongodb connection is established successfullly");
})

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});

module.exports = connect;