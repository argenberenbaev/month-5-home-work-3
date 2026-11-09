import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

async function searchProducts(search) {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
  );

  if (!response.ok) {
    throw new Error("Ошибка поиска");
  }

  return response.json();
}

function Search({ search }) {
  const {
    data,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["search", search],
    queryFn: () => searchProducts(search),

    enabled: search.trim().length >= 3,

    staleTime: 30 * 1000,
  });

  if (search.trim().length < 3) {
    return <p className="search-message">
      Введите минимум 3 символа для поиска
    </p>;
  }

  if (isFetching) return <p>Ищем товары...</p>;

  if (isError) return <p>Ошибка поиска товаров</p>;

  if (!data?.products.length) {
    return <p>Товары не найдены</p>;
  }

  return (
    <div className="products-grid">
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Search;
