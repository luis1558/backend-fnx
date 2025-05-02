const Product = require('../models/Product');
const { v2: cloudinary } = require('cloudinary');

// Buscar productos por query (nombre/descripción)
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    // Si viene una imagen en base64, la subimos a Cloudinary
    if (req.body.image) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: 'bazar_products'
      });
      req.body.images = [uploadResponse.secure_url];
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(400).json({ error: 'Error al crear producto' });
  }
};

// Ver todos los productos *
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

module.exports = {
  searchProducts,
  getProductById,
  createProduct,
  getAllProducts
};