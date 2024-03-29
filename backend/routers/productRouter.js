import express from 'express';
import expressAysncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import Product from '../models/productModel';

const productRouter = express.Router();
productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price : req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      image: req.body.image,
      countInStock:req.body.countInStock
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: 'Product Created', product: createdProduct });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);
productRouter.get(
  '/',
  expressAysncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  '/:id',
  expressAysncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Error in updaing product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
export default productRouter;