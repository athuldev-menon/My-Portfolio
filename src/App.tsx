import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './contact';
import CustomCursor from './CustomCursor';

export default function App() {
  return (
    <>
      {/* The custom cursor sits at the top level */}
      <CustomCursor />

      {/* Your routing logic handles the page content below it */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}