import { Header } from './comps/Header';
import { Footer } from './comps/Footer';
import Home from './pages/Home';
import { About } from './pages/About';
import { Mapa } from './pages/Mapa';
import { Gallery } from './pages/Gallery';

//
import { Route, Routes } from 'react-router-dom';
//
function App() {
  //
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
