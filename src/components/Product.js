// Import Files & Components
import React, { useState } from 'react';
import ImageZoom from 'react-image-zoom';
import './Product.css'; // Example for custom styling

const Product = ({ product }) => {
  const [zoomImage, setZoomImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setZoomImage(imageSrc);
  };

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <img
        src={product.image}
        alt={product.name}
        onClick={() => handleImageClick(product.image)}
        className="product-image"
      />
      {zoomImage && (
        <div className="zoom-container">
          <div className="zoom-image">
            <ImageZoom
              image={{ src: zoomImage, alt: product.name }}
              zoomImage={{ src: zoomImage, alt: product.name }}
            />
          </div>
          <div className="description">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
