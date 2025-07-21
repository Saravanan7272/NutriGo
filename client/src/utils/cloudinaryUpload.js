import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dyd2gm5m6/image/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'nutrigo_uploads');

  try {
    const res = await axios.post(url, formData);
    return res.data.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw err;
  }
};
