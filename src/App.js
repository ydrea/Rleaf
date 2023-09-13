import Home from './pages/Home';
import About from './pages/About';
import Map from './pages/Map';
import Contact from './pages/Contact';
import Ewap from './pages/projects/ewap';
import Banija from './pages/projects/banija';
//
import { Upload } from './pages/Upload';
import { Login } from './pages/Login';
import { Fileupload } from './pages/Fileupload';
//
import './App.css';
import Layout from './Layout';
//
import { Route, Routes } from 'react-router-dom';
import Private from './pages/protected/Private';
//
import { useEffect } from 'react';
import { store } from './redux/store';
import Photos from './pages/Photos';
import GalleryElement from './pages/GalleryElement';
import Photo from './pages/Photo';

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
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/banija" element={<Banija />} />
        <Route path="/projects/ewap" element={<Ewap />} />

        <Route path="/mapa/:signatura" element={<Map />} />
        <Route path="/mapa" element={<Map />} />

        <Route path="/photo" element={<Photo />} />

        <Route path="/photos" element={<Photos />} />

        {/* <Route path="/photos/:popUp" element={<Photos />} /> */}
        {/* 
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:signatura" element={<Gallery />} />
        <Route path="/gallery/:popUp" element={<Gallery />} /> */}

        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
export default App;

// import Demo from './pages/An';

// export default function App() {
//   return <Demo />;
// }
