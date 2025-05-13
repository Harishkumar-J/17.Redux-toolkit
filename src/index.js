import ReactDOM from 'react-dom/client';

//1.1 import the store and the provider component
import store from './store/index.js';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

//2.2 wrap the app/main component by the Provider along with the store
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
