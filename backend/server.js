const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/dbConnect");
const reviewRoutes = require("./api/reviews");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route for browser
app.get("/", (req, res) => {
  res.send(" Backend is working!");
});


app.use("/api/reviews", reviewRoutes);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
