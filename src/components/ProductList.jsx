import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const LIMIT = 12;

async function fetchProducts(page) {
  const skip = (page - 1) * LIMIT;

  const response = await fetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки товаров");
  }

  return response.json();
}

function ProductList({ page, setPage }) {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),

    // Сохраняем предыдущие данные при переключении страниц
    placeholderData: keepPreviousData,

    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isPending) return <p>Загрузка товаров...</p>;

  if (isError) return <p>Ошибка: {error.message}</p>;

  const totalPages = Math.ceil(data.total / LIMIT);

  return (
    <section>
      <div className="list-heading">
        <h2>Все товары</h2>

        {isFetching && (
          <span className="loading">Обновляем товары...</span>
        )}
      </div>

      <div className="products-grid">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ← Назад
        </button>

        <span>
          Страница {page} из {totalPages}
        </span>

        <button
          disabled={page === totalPages || isFetching}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Далее →
        </button>
      </div>
    </section>
  );
}

export default ProductList;
