// Import Files & Components
import React from 'react';
import { useDispatch } from 'react-redux';
import products from '../data/products';
import { addToCart } from '../features/cartSlice';

const StorePage = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mt-5">
      <h1>Store</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">R{product.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
