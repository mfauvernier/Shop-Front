import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../store";

interface Order {
  _id: string;
  address: string;
  price: number;
  delivered: boolean;
  owner: { username: string };
}

const Admin = () => {
  const token = useStore((state) => state.token);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders", token],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://site--shop-test--m7by8jdn4xzv.code.run/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return data;
    },
    staleTime: 1000 * 60 * 1,
  });

  const orderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      await axios.put(
        `https://site--shop-test--m7by8jdn4xzv.code.run/orders/mark-delivered/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold text-gray-800">Commandes</h1>
      {error && (
        <p className="mb-6 text-center text-red-600">{error.message}</p>
      )}
      {isLoading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="space-y-6">
          {data?.map((order) => (
            <div
              key={order._id}
              className="rounded-lg border p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <p className="text-lg font-semibold">Commande n°{order._id}</p>
              <p className="text-gray-700">Nom : {order.owner.username}</p>
              <p className="text-gray-700">
                Adresse de livraison : {order.address}
              </p>
              <p className="text-gray-700">Montant : {order.price} €</p>
              <p
                className={`font-semibold ${
                  order.delivered ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {order.delivered
                  ? "Commande livrée"
                  : "Commande en attente de validation"}
              </p>

              {!order.delivered ? (
                <button
                  onClick={() => orderMutation.mutate(order._id)}
                  disabled={orderMutation.isPending}
                  className={`mt-4 w-full rounded-lg py-2 font-semibold text-white ${
                    orderMutation.isPending
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700"
                  } focus:outline-none`}
                >
                  {orderMutation.isPending
                    ? "Traitement..."
                    : "Marquer comme livrée"}
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-lg bg-gray-400 py-2 font-semibold text-white"
                >
                  Commande livrée
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Admin;
