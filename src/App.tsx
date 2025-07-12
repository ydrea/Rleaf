import { useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { Ewap } from './pages/Projects/EWAP/EWAP';
import { Banija } from './pages/Projects/Banija/Banija';
import { Fileupload } from './pages/Upload/Upload';
import { Login } from './pages/Login/Login';
import { Layout } from './Layout';
import { PhotosLayout } from './PhotosLayout';
import { Route, Routes } from 'react-router-dom';
import { Private } from './pages/Protected/Private';
import { Photos } from './pages/Photos/Photos';
import { Photo } from './pages/Photo/Photo';
import { Karta } from './maps/karta/Karta';
import './App.css';

export const App = (): JSX.Element => {
  useEffect(() => {
    console.log('REACT_APP_SERVER_PUB:', import.meta.env.REACT_APP_SERVER_PUB);
  });

  return (
    <Layout>
      <Routes>
        <Route element={<Private />}>
          <Route path='/upload' element={<Fileupload />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects/banija' element={<Banija />} />
        <Route path='/projects/ewap' element={<Ewap />} />
        <Route path='/maps/:signatura' element={<Karta />} />
        <Route path='/maps' element={<Karta />} />
        <Route path='/photos' element={<PhotosLayout />}>
          <Route index element={<Photos />} />
          <Route path=':signatura' element={<Photo />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Layout>
  );
};
