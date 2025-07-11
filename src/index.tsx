import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './redux/store';
import { ConditionalScroll } from './ScrollTo';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConditionalScroll />
      <App />
    </BrowserRouter>
  </Provider>
);
