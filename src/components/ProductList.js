import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';


function ProductList({ limit, searchTerm, category, products }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      setAllProducts(response.data);
    });

    axios.get('http://localhost:5000/favorites').then((response) => {
      setFavoriteProducts(response.data);
    });
  }, []);

  useEffect(() => {
    let filteredProducts = products ? products : allProducts;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (limit) {
      filteredProducts = filteredProducts.slice(0, limit);
    }

    setDisplayedProducts(filteredProducts);
  }, [limit, searchTerm, category, products, allProducts]);

  const isFavorite = (productId) => {
    return favoriteProducts.some(product => product.id === productId);
  };

  const removeFromFavorites = (productId) => {
    axios.delete(`http://localhost:5000/favorites/${productId}`)
      .then(() => {
        setFavoriteProducts(favoriteProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Не удалось добавить товар в избранные. Ошибка:', error);
      });
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
  {displayedProducts.map(product => (
    <motion.div key={product.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }} className="m-2">
      <Card style={{ width: '18rem', border: 'none' }}>
        <Card.Img variant="top" src={`/${product.image}`} style={{ objectFit: 'cover', height: '100px', maxWidth: '100%', height: '100%', width: '100%'}} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text><i>«{product.description}»</i></Card.Text>
          <Card.Text><strong>${product.price}</strong></Card.Text>
          <div className="d-flex justify-content-between">
            <Button as={Link} to={`/product/${product.id}`} variant="primary">Купить</Button>
            <Button as={Link} to={`/product/${product.id}`} variant="success" className="m-2">В корзину</Button>
          </div>
          {isFavorite(product.id) ? (<Button variant="danger" onClick={() =>
                removeFromFavorites(product.id)}>Убрать из избранных</Button>) : (<p>Товар не в избранном</p>)}
        </Card.Body>
      </Card>
    </motion.div>
  ))}
</div>
  );
}

export default ProductList;
