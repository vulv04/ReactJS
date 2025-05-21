import { useFetchListWithParams } from "./hooks/useFetchListWithParams";
import { useQueryParam } from "./hooks/useQueryPrams";
import ProductList from "./Pages/ProductList";

function App() {
  const [page, setPage] = useQueryParam("page", 1);
  const [limit, setLimit] = useQueryParam("limit", 12);
  const [sort, setSort] = useQueryParam("sort", "");
  const [search, setSearch] = useQueryParam("search", "");

  const { data, loading } = useFetchListWithParams({
    page: Number(page),
    limit: Number(limit),
    search,
    sort,
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Listing</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border rounded px-3 py-2 w-full sm:w-auto"
        />

        <select
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {[6, 12, 18, 24].map((v) => (
            <option key={v} value={v}>
              Hiển thị {v}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Hủy sắp xếp</option>
          <option value="price_asc">Cao - Thấp</option>
          <option value="price_desc">Thấp - Cao</option>
          <option value="name_asc">Tên A-Z</option>
          <option value="name_desc">Tên Z-A</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <ProductList products={data.products} />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage(Number(page) - 1)}
          disabled={Number(page) <= 1} 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => setPage(Number(page) + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
export default App;
