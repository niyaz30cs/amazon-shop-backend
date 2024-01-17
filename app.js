require("dotenv").config();
const express=require("express");
const app=express();
 
const mongoose=require("mongoose");
// const connection = require("./db/Connection");
require("./db/Connection");
const Products=require("./models/productsSchema");
const DefaultData = require("./defaultData");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const router = require("./routes/router");


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());

app.use(router);

const port=8005;
app.listen(port,()=>{
    try
    {
        // await connection();
        console.log(`Server run on Port No-${port}`);
    }
    catch
    {
        console.log(`Some Error on port No-${port}`);
    }
});

DefaultData();