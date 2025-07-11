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

  return <div></div>;
}

export default App;
