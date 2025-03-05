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
    <main className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
      <p className="mb-6 text-4xl font-semibold text-gray-800">La Boutique !</p>
      <input
        type="text"
        placeholder="Rechercher un produit ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-3 w-full max-w-md rounded-xl border-2 border-gray-300 p-2 text-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {error && <p className="text-lg text-red-500">{error.message}</p>}
      {isLoading ? (
        <p className="text-xl text-gray-600">Chargement ...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts?.map((product) => {
            const cartItem = cart.find((item) => item._id === product._id);
            return (
              <div
                key={product._id}
                className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-2xl"
              >
                <Link
                  to={`/products/${product._id}`}
                  className="block text-center"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="mx-auto mb-4 h-48 w-48 rounded-md object-contain"
                  />
                  <p className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </Link>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    -
                  </button>
                  <p className="text-xl">{cartItem?.quantity || 0}</p>
                  <button
                    onClick={() =>
                      increaseQuantity({ ...product, quantity: 1 })
                    }
                    className="rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Products;
