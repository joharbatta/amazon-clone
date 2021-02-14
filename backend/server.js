/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import uploadRouter from './routers/uploadRouter';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';

mongoose.connect(config.MONGODB_URL,{
	useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../frontend')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});
// app.get('/api/products', (req, res) => {
// 	res.send(data.products);
// });

// app.get('/api/products/:id', (req, res) => {
// 	const product = data.products.find((x) => x._id === req.params.id);
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({ message: 'Product Not Found!' });
// 	}
// });


// error handler
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
	console.log('serve at http://localhost:5000');
  console.log(path.join(__dirname, 'uploads'));
});
