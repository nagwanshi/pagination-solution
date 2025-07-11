import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const fetchProductAsync = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(function () {
    fetchProductAsync();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>prod.title</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
