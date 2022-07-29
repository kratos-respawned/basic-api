//imports
import express from "express";
import "./config.js";
import product from "./product.js";
import multer from "multer";
import cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
//middleware
app.use(express.json());
app.use(cors());
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
app.get("/find/:name", async (req, resp) => {
  let data = await product.find({
    $or: [
      { name: { $regex: req.params.name } },
      //   { brand: { $regex: req.params.brand } },
    ],
  });
  resp.status(200).send(data);
});
app.delete("/delete/:id", async (req, resp) => {
  let data = await product.deleteOne({ _id: req.params.id });
  data.acknowledged
    ? data.deletedCount
      ? resp.status(200).send("done")
      : resp.status(200).send("does not exists or already done")
    : resp.status(200).send("failed");
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
  data.acknowledged
    ? data.modifiedCount
      ? resp.status(200).send("done")
      : resp.status(200).send("does not exists or already done")
    : resp.status(200).send("failed");
});
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

app.post("/upload", upload, (req, resp) => {
  resp.status(200).send("file uploaded");
});
app.listen(port, () => {
  console.log(`server is running at port :: %d`, port);
});
