import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Plantilla from './componentes/Plantilla';
import { FavoritosProvider, Favoritos } from './componentes/Favoritos';

function App() {
  return (
    <FavoritosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Plantilla />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </Router>
    </FavoritosProvider>
  );
}

export default App;
