const db = require('../db');

const Item = {
  async create(itemData) {
    const {
      user_id,
      image_url_garment,
      image_url_label,
      brand,
      category,
      size,
      material
    } = itemData;

    const query = {
      text: 'INSERT INTO items(user_id, image_url_garment, image_url_label, brand, category, size, material) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [user_id, image_url_garment, image_url_label, brand, category, size, material],
    };
    const { rows } = await db.query(query.text, query.values);
    return rows[0];
  },

  async findByUserId(userId) {
    const query = {
      text: 'SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC',
      values: [userId],
    };
    const { rows } = await db.query(query.text, query.values);
    return rows;
  },
};

module.exports = Item;
