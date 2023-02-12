const express = require("express");
const apiRouter = require("./Routes/api");
const cors = require("cors");
require("dotenv").config();

const a = require("./Models");

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
