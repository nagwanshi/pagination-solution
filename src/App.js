import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProductAsync = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.floor(data.total / 10));
    }
  };

  useEffect(
    function () {
      fetchProductAsync();
    },
    [page]
  );

  function handleSelectedPage(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>prod.title</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => handleSelectedPage(page - 1)}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, idx) => {
            return (
              <span
                className={page === idx + 1 ? "pagination__selected" : ""}
                onClick={() => handleSelectedPage(idx + 1)}
                key={idx}
              >
                {idx + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disabled"}
            onClick={() => handleSelectedPage(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
