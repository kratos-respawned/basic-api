//imports
import express from "express";
import "./config.js";
import Collection from "./product.js";
const app = express();
//middleware
app.use(express.json());
//routes
app.post("/create", (req, resp) => {
  resp.status(200).send(req.body);
});
app.listen(3000, () => {
  console.log("server is running at port :: 3000");
});
