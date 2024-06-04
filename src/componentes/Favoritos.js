import React, { createContext, useState, useContext } from 'react';
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Crear el contexto
const FavoritosContext = createContext();

// Hook para usar el contexto
export const useFavoritos = () => useContext(FavoritosContext);

// Proveedor del contexto
const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState(['']);

  const addFavorito = (nuevoFavorito) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, nuevoFavorito]);
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, addFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

// Componente que muestra los favoritos
const Favoritos = () => {
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();

  return (
    <div>
      <h1>Favoritos</h1>
      <Button variant="secondary" onClick={() => navigate("/")}>
            volver
            </Button>
      {favoritos.length > 0 ? (
        favoritos.map((favorito, index) => (
          <div key={index}>
            <p>{favorito}</p>
          </div>
        ))
      ) : (
        <p>No hay favoritos.</p>
      )}
    </div>
  );
};

export { FavoritosProvider, Favoritos };
