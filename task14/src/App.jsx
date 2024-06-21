/* import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import fetchData from "./fetchData";
import Modal from "./Modal";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch product data from the API when the component mounts.
    fetchData("https://fakestoreapi.com/products").then((data) => {
      // Update the products state with the fetched data.
      setProducts(data);
    });
  }, []);

  // Handle the card click event.
  const handleCardClick = (product) => {
    // Only open the modal if the product is available.
    if (product.timeUp !== "unable") {
      setSelectedProduct(product);
    }
  };

  // Handle the modal close event.
  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  return (
    // Render a list of product cards.
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          image={product.image}
          id={product.id}
          handleClick={() => handleCardClick(product)}
          timeUp={product.timeUp}
        />
      ))}
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App; */

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import fetchData from "./fetchData";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch product data from the API when the component mounts.
    fetchData("https://fakestoreapi.com/products").then((data) => {
      // Update the products state with the fetched data.
      setProducts(data);
    });
  }, []);

  // A callback function to handle the card click event.
  const handleClick = (product) => {
    // Only open the modal for available products.
    if (product.timeUp !== "unable") {
      setSelectedProduct(product);
    }
  };

  // A callback function to close the modal.
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          image={product.image}
          id={product.id}
          handleClick={() => handleClick(product)}
        />
      ))}
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
