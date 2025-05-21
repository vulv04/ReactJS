const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-40 w-full object-cover rounded mb-2"
          />
          <h2 className="text-lg font-semibold mb-1">{p.title}</h2>
          <p className="text-green-600 font-bold">${p.price}</p>
          <p className="text-gray-500">{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
