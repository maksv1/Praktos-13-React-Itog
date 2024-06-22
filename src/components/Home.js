import React from 'react';
import ProductList from './ProductList';
import ContactForm from './ContactForm';
import { Container, Row, Col } from 'react-bootstrap';
import "./home.css"
import gif from "./main.jpg"



function Home() {
  return (
    <Container>
        <img src={gif} alt='Computer' className="fotos"/>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать в House staff</h2>
          <p>Найдите мебель по низким ценам ну или почти по низким</p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h3>Популярные товары</h3>
          <ProductList limit={10} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h3>Обратная связь</h3>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
