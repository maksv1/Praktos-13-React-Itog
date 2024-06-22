import { Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

function Catalog() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      const products = response.data;
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  return (
    <Container className="my-5">
  <Row className="justify-content-center">
    <Col md={8}>
      <h2 className="text-center mb-4">Каталог</h2>
      <Form className="d-flex flex-column flex-md-row justify-content-between mb-4">
        <Form.Group controlId="search" className="mb-3 mb-md-0">
          <Form.Label className="sr-only">Поиск</Form.Label>
          <Form.Control type="text" placeholder="Найти..." value={searchTerm} onChange={e =>
              setSearchTerm(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="category" className="mb-3 mb-md-0">
          <Form.Label className="sr-only">Категория</Form.Label>
          <Form.Control as="select" value={selectedCategory} onChange={e =>
              setSelectedCategory(e.target.value)}>
            <option value="">Все</option> {categories.map((category, index) =>
                  (<option key={index} value={category}>{category}</option>))}
          </Form.Control>
        </Form.Group>
      </Form>
      <ProductList searchTerm={searchTerm} category={selectedCategory}/>
    </Col>
  </Row>
</Container>

  );
}

export default Catalog;
