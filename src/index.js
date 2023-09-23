import React, { ReactPropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
//
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

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
