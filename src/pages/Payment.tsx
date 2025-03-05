import { useActionState, useEffect } from "react";
import { useStore } from "../store";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  const reset = useStore((state) => state.resetCart);

  const navigate = useNavigate();

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
      reset();
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

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/products");
      }, 5000);
    }
  }, [state.success, navigate]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Page Paiement
      </h1>
      <p className="mb-6 text-xl font-semibold text-gray-800">
        Montant total : {total.toFixed(2)} €
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Adresse de livraison"
            name="address"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded-lg py-3 font-semibold text-white ${isPending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} focus:outline-none`}
          >
            {isPending ? "Traitement en cours..." : "Commander"}
          </button>
        </div>
        {state.error && (
          <p className="text-center text-red-600">{state.error}</p>
        )}
        {state.success && (
          <p className="text-center text-green-600">
            La commande est validée ! Vous allez être redirigé !
          </p>
        )}
      </form>
    </main>
  );
};

export default Payment;
