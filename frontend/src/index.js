import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { parseRequestUrl } from './utils';
import Error404Screen from './screens/Error404Screen';

const routes = {
	'/': HomeScreen,
	'/product/:id': ProductScreen,
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
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
