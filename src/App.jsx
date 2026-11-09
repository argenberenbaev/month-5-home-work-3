import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Search from "./components/Search";

function App() {
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="container">
      <header className="header">
        <h1>Product Store</h1>
        <p>Интернет-магазин на React Query</p>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Найти товар..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {searchInput.trim().length > 0 ? (
        <Search search={search} />
      ) : (
        <ProductList page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default App;
