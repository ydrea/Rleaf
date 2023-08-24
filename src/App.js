import Home from './pages/Home';
import About from './pages/About';
import { Mapa } from './pages/Mapa';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

import { Upload } from './pages/Upload';
import { Login } from './pages/Login';

//
import './App.scss';
import Layout from './Layout';
//
import { Route, Routes } from 'react-router-dom';
import Private from './pages/protected/Private';
//
import { useEffect } from 'react';
import { store } from './redux/store';
import Photos from './pages/Photos';
import Gallery from './pages/Gallery';

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
        <Route path="/contacts" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/mapa" element={<Mapa />} />
        <Route path="/mapa/:popUp" element={<Mapa />} />
        <Route path="/mapa/:signatura" element={<Mapa />} />

        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:signatura" element={<Photos />} />
        <Route path="/photos/:popUp" element={<Photos />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:signatura" element={<Gallery />} />
        <Route path="/gallery/:popUp" element={<Gallery />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
export default App;
