const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();

// Get all products
router.get('/',  async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Create a new product
router.post('/create', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    console.log("nikhil")
    console.log(name ,price ,description)
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

// Update a product
router.put('/:id',  async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name;
    product.price = price;
    product.description = description;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete a product
router.delete('/:id',  async (req, res) => {
  const { id } = req.params;
  console.log(id,"thids is ir")
  try {
    const product = await Product.findById(id);
    console.log(product)
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
