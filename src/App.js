import Home from './pages/Home';
import About from './pages/About';
// import Map from './pages/Map';
import Contact from './pages/Contact';
import Ewap from './pages/projects/ewap';
import Banija from './pages/projects/banija';
//
import { Fileupload } from './pages/Upload';
import PhotosEDIT from './pages/PhotosEDIT';
import { Login } from './pages/Login';
// import { Fileupload } from './pages/Fileupload';
//
import './App.css';
import Layout from './Layout';
import PhotosLayout from './PhotosLayout';

//
import { Route, Routes } from 'react-router-dom';
import Private from './pages/protected/Private';
//
import { useEffect } from 'react';
import Photos from './pages/Photos';
import Photo from './pages/Photo';
import Map from './maps/karta/Karta';
// import ScrollToHashElement from './ToHash';
import ScrollToAnchor from './pages/ScrollToAnchor';
function App() {
  //

  useEffect(() => {
    console.log(
      'REACT_APP_SERVER_PUB:',
      process.env.REACT_APP_SERVER_PUB
    );
  });
  return (
    <Layout>
      <Routes>
        <Route element={<Private />}>
          <Route path="/upload" element={<Fileupload />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/banija" element={<Banija />} />
        <Route path="/projects/ewap" element={<Ewap />} />
        <Route path="/maps/:signatura" element={<Map />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/photos" element={<PhotosLayout />}>
          <Route index element={<Photos />} />
          <Route path=":signatura" element={<Photo />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
export default App;
