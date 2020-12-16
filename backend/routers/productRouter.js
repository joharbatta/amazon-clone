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
      name: 'Hiskywin Full Zip Running Shirts Thermal Workout',
      description: 'sample desc',
      category: 'Shirts',
      brand: 'Wakefit',
      image: '/images/BB.jpg',
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
export default productRouter;