import mongoose from "mongoose";
const productTable = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
});
const product = mongoose.model("data", productTable);
export default product;
