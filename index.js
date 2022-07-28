import mongoose from "mongoose";
await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
const productTable = new mongoose.Schema({
  name: String,
  price: String,
  brand: String,
});
const insertDB = async () => {
  const ProductsModel = mongoose.model("data", productTable);
  let data = new ProductsModel({
    name: "m212",
    brand: "seeeqq",
    price: "69k",
    category: "phone",
  });
  let result = await data.save();
  console.log(result ? "done" : "failed");
};
const updateDB = async () => {
  const ProductsModel = mongoose.model("data", productTable);
  let data = await ProductsModel.updateOne(
    { name: "m212" },
    {
      $set: {
        name: "m21",
        price: "9k",
      },
    }
  );
  console.log(
    data.acknowledged
      ? data.modifiedCount
        ? `${data.modifiedCount} items updated`
        : "already done"
      : "failed"
  );
};
const deleteDb = async () => {
  const Product = mongoose.model("data", productTable);
  let data = await Product.deleteOne({ name: "m21" });
  console.log(
    data.acknowledged
      ? data.deletedCount
        ? `${data.deletedCount} items deleted`
        : "already deleted"
      : "failed"
  );
};
const findDb = async () => {
  const Product = mongoose.model("data", productTable);
  let data = await Product.find({ name: "m212" });
  console.log(data);
};
findDb();
// insertDB();
// updateDB();
// deleteDb();
