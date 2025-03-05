import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string;
}

const Products = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useStore();

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/products");
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredProducts(
        data.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, data]);

  return (
    <main>
      <p>Page Products</p>
      <input
        type="text"
        placeholder="Rechercher un produit ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p>Chargement ...</p>
      ) : (
        filteredProducts?.map((product) => {
          const cartItem = cart.find((item) => item._id === product._id);
          return (
            <div key={product._id}>
              <Link to={`/products/${product._id}`}>
                <p>{product.title}</p>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  width="200px"
                />
              </Link>
              <button onClick={() => decreaseQuantity(product._id)}>-</button>
              <p>{cartItem?.quantity || 0}</p>
              <button
                onClick={() => increaseQuantity({ ...product, quantity: 1 })}
              >
                +
              </button>
            </div>
          );
        })
      )}
    </main>
  );
};

export default Products;
