const express = require('express');
const AiService = require('../services/aiService');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All AI routes are protected
router.use(authMiddleware);

router.post('/market-research', async (req, res) => {
  try {
    const { itemId } = req.body;
    const researchData = await AiService.getMarketResearch(itemId);
    res.status(200).json(researchData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/generate-listing', async (req, res) => {
  try {
    const { itemId } = req.body;
    const listing = await AiService.generateListing(itemId);
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
