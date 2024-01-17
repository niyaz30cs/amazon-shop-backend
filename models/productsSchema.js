const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    // title: String,
    // longTitle:String,
    // shortTitle:String,
    price: Object,
    // price: String,
    // cost:Number,
    // discount:String,
    // mrp:Number,
    description: String,
    discount1: String,
    tagline: String
})

const Products = new mongoose.model("products", productsSchema);
module.exports = Products;