import mongoose from "mongoose";
const productTable = new mongoose.Schema({
  name: String,
  brand: String,
  price: String,
});
export default productTable;
