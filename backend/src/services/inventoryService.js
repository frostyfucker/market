const Item = require('../models/item');
const AiService = require('./aiService'); // Using the mock AI service for now

const InventoryService = {
  async createItem(userId, garmentImage, labelImage) {
    try {
      // In a real application, you would upload images to a cloud storage
      // and get back URLs. For now, we'll use placeholder paths based on multer's behavior.
      const garmentImageUrl = garmentImage.path;
      const labelImageUrl = labelImage.path;

      // Call the AI service to get item details from the images
      const aiDetails = await AiService.getDetailsFromImages(garmentImageUrl, labelImageUrl);

      const itemData = {
        user_id: userId,
        image_url_garment: garmentImageUrl,
        image_url_label: labelImageUrl,
        ...aiDetails // brand, category, size, material
      };

      const newItem = await Item.create(itemData);
      return newItem;
    } catch (error) {
      throw new Error(`Item creation failed: ${error.message}`);
    }
  },

  async getItemsForUser(userId) {
    try {
      const items = await Item.findByUserId(userId);
      return items;
    } catch (error) {
      throw new Error(`Failed to retrieve items: ${error.message}`);
    }
  }
};

module.exports = InventoryService;
