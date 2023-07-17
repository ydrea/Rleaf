import Home from './pages/Home';
import { About } from './pages/About';
import { Mapa } from './pages/Mapa';
import { Gallery } from './pages/Gallery';
import { Upload } from './pages/Upload';
import { Login } from './pages/Login';

import './App.scss';
import Layout from './Layout';
//
import { Route, Routes } from 'react-router-dom';
import Private from './pages/protected/Private';
//
import { useEffect } from 'react';
import { store } from './redux/store';
//
function App() {
  //

  useEffect(() => {
    console.log(store);
  });
  return (
    <Layout>
      <Routes>
        <Route element={<Private />}>
          <Route path="upload" element={<Upload />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
export default App;
