import { useActionState } from "react";
import { useStore } from "../store";
import axios, { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

interface OrderState {
  error: string | null;
  success: boolean;
}

interface OrderProduct {
  product: string;
  quantity: number;
}

interface Order {
  products: OrderProduct[];
  address: string;
  price: number;
}

const Payment = () => {
  const total = useStore((state) => state.totalPrice);
  const cart = useStore((state) => state.cart);

  const addOrder = async (_prevState: OrderState, formdata: FormData) => {
    try {
      const address = formdata.get("address") as string;
      const products = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
      const order: Order = { products, address, price: total };
      const token = localStorage.getItem("token");
      await axios.post(
        "https://site--shop-test--m7by8jdn4xzv.code.run/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return { error: null, success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        switch (axiosError.response?.data.message) {
          case "Missing address":
            return { success: false, error: "Veuillez entrer une addresse" };
          default:
            return {
              success: false,
              error: "Une erreur est survenue, veuillez réessayer",
            };
        }
      }
      return { success: false, error: "Erreur inconue" };
    }
  };

  const [state, formAction, isPending] = useActionState<OrderState, FormData>(
    addOrder,
    {
      error: null,
      success: false,
    },
  );

  return (
    <main>
      <h1>Page Paiement</h1>
      <p>Montant total {total.toFixed(2)} €</p>
      <form action={formAction}>
        <input type="text" placeholder="Adresse" name="address" required />
        <button disabled={isPending}>Commander</button>
        {state.error && <p>{state.error}</p>}
        {state.success && <p>La commande est validée !</p>}
      </form>
    </main>
  );
};

export default Payment;
