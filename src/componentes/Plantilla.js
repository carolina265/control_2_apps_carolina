import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Plantilla.css';
import axios from "axios";
import { useFavoritos } from './Favoritos';

function Plantilla() {
  const [texto, setTexto] = useState('');
  const [facts, setFacts] = useState([]);
  const [error, setError] = useState('');
  const [showAddAllButton, setShowAddAllButton] = useState(false);
  const navigate = useNavigate();
  const { addFavorito } = useFavoritos();

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const buscarFacts = async () => {
    setFacts([]);
    setError('');
    setShowAddAllButton(false);
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${texto}`);
      if (response.data.result.length === 0) {
        setError('No se encontraron hechos.');
      } else {
        setFacts(response.data.result);
        setShowAddAllButton(true);
      }
    } catch (error) {
      setError('Error fetching data. Please try again.');
    }
  };

  const addAllToFavorites = () => {
    facts.forEach(fact => addFavorito(fact.value));
  };

  return (
    <div>
      <center>
        <Container>
          <h1>Factos</h1>
          <Form>
            <Form.Group controlId="formBasicInput">
              <Form.Label>Ingrese palabra para buscar Factos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese texto aquí"
                value={texto}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={buscarFacts}>
              Mostrar
            </Button>
            {showAddAllButton && (
              <Button variant="secondary" onClick={addAllToFavorites}>
                Añadir todos a Favoritos
              </Button>
            )}
            <Button variant="secondary" onClick={() => navigate("/favoritos")}>
              Favoritos
            </Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="facts">
            {facts.map((fact) => (
              <div key={fact.id} className="fact">
                <p>{fact.value}</p>
                <p><strong>Fecha de creación:</strong> {new Date(fact.created_at).toLocaleDateString()}</p>
                {fact.categories.length > 0 && (
                  <p><strong>Categorías:</strong> {fact.categories.join(', ')}</p>
                )}
                <Button variant="secondary" onClick={() => addFavorito(fact.value)}>
                  Añadir a Favoritos
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </center>
    </div>
  );
}

export default Plantilla;
