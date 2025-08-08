const dbConnect = require('../utils/dbConnect');
const Review = require('../models/Review');

module.exports = async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const styleId = req.query.styleId;
    if (!styleId) return res.status(400).json({ error: 'styleId query parameter is required' });

    try {
      const reviews = await Review.find({ styleId });
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } 
  else if (req.method === 'POST') {
    const { styleId, userId, userName, rating, text } = req.body;
    if (!styleId || !userId || !userName || !rating || !text) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const newReview = new Review({ styleId, userId, userName, rating, text });
      await newReview.save();
      return res.status(201).json(newReview);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save review' });
    }
  }
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
