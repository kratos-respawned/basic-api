import mongoose from "mongoose";
const productTable = new mongoose.Schema({
  name: String,
  brand: String,
  price: String,
});
const product = mongoose.model("data", productTable);
export default product;
