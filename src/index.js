import React, { ReactPropTypes } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
//
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './redux/api/apiSlice';
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider api={apiSlice}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
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
