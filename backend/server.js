/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';


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
app.use('/api/users', userRouter);
app.get('/api/products', (req, res) => {
	res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
	const product = data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found!' });
	}
});


// error handler
app.use((err, req, res, next) => {
  // render the error page
   if (res.headersSent) {
    return next(err)
  }
   res.status(err.status || 500);
   res.send('error', { error: err });

});

app.listen(5000, () => {
	console.log('serve at http://localhost:5000');
});
