
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reviewRoutes = require("./api/reviews");
const dbConnect = require("./utils/dbConnect");

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/reviews", reviewRoutes);

//  Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//  Only run app.listen in local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}


module.exports = app;
