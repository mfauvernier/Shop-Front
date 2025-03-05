import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../store";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  reviews: Review[];
  quantity: number;
}

interface Review {
  _id: string;
  reviewerName: string;
  comment: string;
  rating: number;
}

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

const Product = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useStore();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://site--shop-test--m7by8jdn4xzv.code.run/products/${id}`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isLoading) return <p className="text-center text-xl">Chargement...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-500">
        Erreur : {error.message}
      </p>
    );
  if (!data) return <p className="text-center text-xl">Produit introuvable</p>;

  const cartItem = cart.find((item: CartItem) => item._id === data._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={data.images[0]}
            alt={data.title}
            className="w-full max-w-sm rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="mb-4 text-3xl font-semibold text-gray-800">
            {data.title}
          </h1>
          <p className="mb-4 text-lg text-gray-600">{data.brand}</p>
          <p className="mb-4 text-lg text-gray-800">{data.description}</p>
          <p className="mb-6 text-2xl font-bold text-gray-900">
            {data.price} €
          </p>
          <div className="mb-6 flex items-center">
            <button
              onClick={() => decreaseQuantity(data._id)}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-xl">-</span>
            </button>
            <p className="mx-4 text-xl font-semibold">{quantityInCart}</p>
            <button
              onClick={() => increaseQuantity({ ...data, quantity: 1 })}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Avis</h2>
        {data.reviews.length > 0 ? (
          <div className="space-y-6">
            {data.reviews.map((review: Review) => (
              <div
                key={review._id}
                className="rounded-lg bg-gray-50 p-4 shadow-sm"
              >
                <p className="text-lg font-semibold text-gray-700">
                  {review.reviewerName}
                </p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500">{review.rating} / 5</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Aucun avis pour ce produit.</p>
        )}
      </div>
    </main>
  );
};

export default Product;
