import {Container, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

function Izbrannoe() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error('Не удалось загрузить избранные товары. Ошибка:', error);
      });
  }, []);

  return (
    <Container className="d-flex flex-column flex-grow-1">
      <Row className="my-4">
        <Col>
          <h2>Избранные товары</h2>
          {favorites.length > 0 ? (<ProductList products={favorites} />) : (<p>Нет избранных товаров.</p>)}
        </Col>
      </Row>
    </Container>
  );
}

export default Izbrannoe;
