const express = require('express');
const multer = require('multer');
const InventoryService = require('../services/inventoryService');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for file uploads. This is a basic setup.
const upload = multer({ dest: 'uploads/' });

// All inventory routes are protected and require a valid JWT
router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const items = await InventoryService.getItemsForUser(req.user.userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/upload', 
  upload.fields([{ name: 'garment', maxCount: 1 }, { name: 'label', maxCount: 1 }]), 
  async (req, res) => {
    try {
      const { garment, label } = req.files;
      if (!garment || !label) {
        return res.status(400).json({ message: 'Both garment and label images are required' });
      }

      const newItem = await InventoryService.createItem(req.user.userId, garment[0], label[0]);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;
