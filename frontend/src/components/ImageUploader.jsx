import React, { useState } from 'react';
import api from '../services/api'; // Use the API service

function ImageUploader() {
  const [garmentImage, setGarmentImage] = useState(null);
  const [labelImage, setLabelImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!garmentImage || !labelImage) {
      setMessage('Please select both garment and label images.');
      return;
    }

    const formData = new FormData();
    formData.append('garment', garmentImage);
    formData.append('label', labelImage);

    try {
      const response = await api.post('/inventory/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage('Images uploaded successfully!');
        setGarmentImage(null);
        setLabelImage(null);
      } else {
        setMessage(`Upload failed: ${response.data.message || response.statusText}`);
      }
    } catch (error) {
      setMessage(`Upload failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} role="form"> {/* Added role="form" */}
      <h2>Upload Images</h2>
      <div>
        <label htmlFor="garmentImage">Garment Image:</label>
        <input
          type="file"
          id="garmentImage"
          accept="image/*"
          onChange={(e) => setGarmentImage(e.target.files[0])}
          required
        />
      </div>
      <div>
        <label htmlFor="labelImage">Label Image:</label>
        <input
          type="file"
          id="labelImage"
          accept="image/*"
          onChange={(e) => setLabelImage(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Upload Images</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ImageUploader;