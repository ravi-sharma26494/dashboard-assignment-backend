const express = require("express");
const mongoose = require("mongoose");
const Data = require("./models/info");

const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

// const mongoURI = "mongodb://localhost:27017/netweave-store";
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://netweave-dashboard.vercel.app"],
    credentials: true,
  })
);

//------------------------Ignore the above line -------------------------------------------------------------------------
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
