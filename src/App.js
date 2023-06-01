import Home from './pages/Home';
import { About } from './pages/About';
import { Mapa } from './pages/Mapa';
import { Gallery } from './pages/Gallery';
import './App.scss';
import Layout from './Layout';
//
import { Route, Routes } from 'react-router-dom';
//
function App() {
  //
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Layout>
  );
}
export default App;
