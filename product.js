import mongoose from "mongoose";
const productTable = new mongoose.Schema({
  name: String,
  brand: String,
  price: String,
});
const Collection = mongoose.model("data", productTable);
export default Collection;
