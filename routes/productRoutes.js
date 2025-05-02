const express = require('express');
const router = express.Router();
const { v2: cloudinary } = require('cloudinary');
const {
  searchProducts,
  getProductById,
  createProduct,
  getAllProducts
} = require('../controllers/productController');

// Endpoints
router.get('/items', searchProducts);
router.get('/items/all', getAllProducts);
router.get('/items/:id', getProductById);
router.post('/create', createProduct);

// Endpoint para subir imágenes
router.post('/upload', async (req, res) => {
  try {
    const fileStr = req.body.image;
    
    // Optimización automática de Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${fileStr}`, {
      upload_preset: 'bazar_products',
      folder: 'bazar-products',
      quality: 'auto:good', // Compresión inteligente
      fetch_format: 'auto', // Entrega en formato moderno (WebP)
      width: 1200, // Redimensiona si es muy grande
      crop: 'limit'
    });

    res.json({ 
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id 
    });
  } catch (err) {
    console.error('Error al subir imagen:', err);
    res.status(500).json({ 
      error: 'Error al procesar imagen',
      details: err.message
    });
  }
});

module.exports = router;