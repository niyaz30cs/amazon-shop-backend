const mongoose = require("mongoose");
const DB = process.env.URL;

mongoose.connect(DB)
    .then(() => console.log("Connection Successfull.!!!"))
    .catch((error) => console.log("Error" + error.message))


// const mongoose = require('mongoose');

// mongoose.set('strictQuery', true)

// const url="mongodb+srv://niyaz30cs:Niyaz786@cluster0.kxsn674.mongodb.net/ecommerce?retryWrites=true&w=majority";
// const url="mongodb+srv://niyaz30cs:Niyaz786@cluster0.kxsn674.mongodb.net/Amazonweb?retryWrites=true&w=majority";
// const url=process.env.URL;

// const connection = async()=>{
//     try{
//         await mongoose.connect(url);
//         console.log("Connection Established !!!!");
//     }
//     catch(err){
//         console.log(err,"Some Error Creating Connection !!!!");
//     }
// }

// module.exports = connection;