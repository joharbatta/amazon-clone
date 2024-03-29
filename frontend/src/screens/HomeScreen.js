import axios from 'axios';
import Rating from '../components/Rating';
import { getProducts } from '../api';
import { apiUrl } from "../config";

const HomeScreen = {
	render: async () => {
      const products = await getProducts();
      if (products.error) {
        return `<div class="error">${products.error}</div>`;
      }
		return `
    <ul class="products">
      ${products
			.map(
				(product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${apiUrl}${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        <div class="product-rating">
        ${Rating.render({
          value: product.rating,
          text: `${product.numReviews} reviews`,
        })}
      </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          $${product.price}
        </div>
        </div>
      </li>
      `
			)
			.join('')}
    </ul>
    `;
	},
};
export default HomeScreen;

// https://stackoverflow.com/questions/45812160/unexpected-comma-using-map template literals use the toString() method which by default joins the returned array by map with a ,.
// To avoid this "problem" you can use join('')
// The join() method returns the array as a string.
