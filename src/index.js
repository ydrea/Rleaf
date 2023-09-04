import React, { ReactPropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
//
import { Provider } from 'react-redux';
import { store } from './redux/store';

//

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <ApiProvider api={apiSlice}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ApiProvider> */}
  </Provider>
);
// //
// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );
