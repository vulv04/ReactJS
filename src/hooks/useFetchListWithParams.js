// src/hooks/useFetchListWithParams.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchListWithParams = ({ page, limit, search, sort }) => {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${
        (page - 1) * limit
      }`;

      try {
        const response = await axios.get(url);
        let products = response.data.products;

        // Filter by search
        if (search) {
          products = products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Sort
        if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
        if (sort === "price_desc") products.sort((a, b) => b.price - a.price);
        if (sort === "name_asc")
          products.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "name_desc")
          products.sort((a, b) => b.title.localeCompare(a.title));

        setData({ products, total: response.data.total });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, search, sort]);

  return { data, loading };
};
