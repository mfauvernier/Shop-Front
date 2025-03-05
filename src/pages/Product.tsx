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
      const { data } = await axios.get(`http://localhost:4000/products/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data) return <p>Produit introuvable</p>;

  const cartItem = cart.find((item: CartItem) => item._id === data._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <main>
      <p>Page Produit {id}</p>
      <div>
        <p>{data?.title}</p>
        <p>{data.brand}</p>
        <img src={data?.images[0]} alt={data.title} width="200px" />
        <p>{data?.description}</p>
        <p>{data?.price} €</p>
        <button onClick={() => decreaseQuantity(data._id)}>-</button>
        <p>{quantityInCart}</p>
        <button onClick={() => increaseQuantity({ ...data, quantity: 1 })}>
          +
        </button>
        {data.reviews.map((review: Review) => (
          <div key={review._id}>
            <p>{review.reviewerName}</p>
            <p>{review.comment}</p>
            <p>{review.rating} / 5</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Product;
