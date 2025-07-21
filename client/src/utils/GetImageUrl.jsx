import React, { useState } from 'react';
import { uploadImageToCloudinary } from './cloudinaryUpload';

function GetImageUrl() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select an image!');
    try {
      const url = await uploadImageToCloudinary(selectedFile);
      setImageUrl(url);
    } catch (error) {
      alert('Upload failed. Check console for details.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload & Show Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Image URL:</strong> {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default GetImageUrl;
