//imports
import express from "express";
import "./config.js";
import product from "./product.js";
const app = express();
//middleware
app.use(express.json());
//routes
app.post("/create", async (req, resp) => {
  let data = new product(req.body);
  let result = await data.save();
  resp.status(201).send(result);
});
app.get("/list", async (req, resp) => {
  let data = await product.find({});
  resp.status(200).send(data);
});
app.get("/find/:name/:brand", async (req, resp) => {
  let data = await product.find({
    $or: [
      { name: { $regex: req.params.name } },
      { brand: { $regex: req.params.brand } },
    ],
  });
  resp.status(200).send(data);
});
app.delete("/delete/:id", async (req, resp) => {
  let data = await product.deleteOne({ _id: req.params.id });
  resp.status(200).send(data);
});
app.put("/update/:id", async (req, resp) => {
  let data = await product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.status(500).send(data);
});

app.listen(3000, () => {
  console.log("server is running at port :: 3000");
});
