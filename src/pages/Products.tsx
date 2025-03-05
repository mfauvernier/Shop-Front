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
      const { data } = await axios.get(
        "https://site--shop-test--m7by8jdn4xzv.code.run/products",
      );
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
    <main className="flex flex-col items-center justify-center">
      <p className="text-3xl">La Boutique !</p>
      <input
        type="text"
        placeholder="Rechercher un produit ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-3 rounded-xl border-1 p-2 px-14 text-sm"
      />
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p>Chargement ...</p>
      ) : (
        filteredProducts?.map((product) => {
          const cartItem = cart.find((item) => item._id === product._id);
          return (
            <div
              key={product._id}
              className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-2xl"
            >
              <Link to={`/products/${product._id}`}>
                <p>{product.title}</p>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-36 w-36 object-contain"
                />
              </Link>
              <div className="flex justify-center gap-6">
                <button onClick={() => decreaseQuantity(product._id)}>-</button>
                <p>{cartItem?.quantity || 0}</p>
                <button
                  onClick={() => increaseQuantity({ ...product, quantity: 1 })}
                >
                  +
                </button>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
};

export default Products;
