import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PRODUCTS_SERVER_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>This is products microfrontend</h2>
      <ul>
        <li>This data is from products microservice</li>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
