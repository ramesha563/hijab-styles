// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./utils/dbConnect');
const reviewsHandler = require('./api/reviews');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

dbConnect().then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('DB connection error:', err);
  process.exit(1);
});

app.all('/api/reviews', async (req, res) => {
  await reviewsHandler(req, res);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Local backend running on port ${PORT}`);
});
