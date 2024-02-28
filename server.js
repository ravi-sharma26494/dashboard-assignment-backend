const express = require("express");
const mongoose = require("mongoose");
const Data = require("./models/info");

const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

// const mongoURI = "mongodb://localhost:27017/netweave-store";
const mongoURI =
  "mongodb+srv://ravisharma26494:PnJKgZqCctxmwIoS@cluster0.hqql3lj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/insertdata", async (req, res) => {
  try {
    const requestData = req.body; // Assuming you're sending an array of objects in the request body
    const insertedData = await Data.insertMany(requestData);
    res.json(insertedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/getdata", async (req, res) => {
  try {
    const allData = await Data.find({});
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
