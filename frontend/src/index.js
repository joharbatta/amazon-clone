import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { parseRequestUrl } from './utils';
import Error404Screen from './screens/Error404Screen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

const routes = {
	'/': HomeScreen,
	'/product/:id': ProductScreen,
	'/cart/:id':CartScreen,
	'/cart':CartScreen,
	'/signin': SigninScreen,
};
const router = async () => {
	const request = parseRequestUrl();
	console.log(request);
	const parseUrl =
		(request.resource ? `/${request.resource}` : '/') +
		(request.id ? '/:id' : '') +
		(request.verb ? `/${request.verb}` : '');
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
	console.log(parseUrl);
	const main = document.getElementById('main-container');
	main.innerHTML = await screen.render();
	await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
