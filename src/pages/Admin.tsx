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
    <main>
      <h1>Page Admin</h1>
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p>Chargement ...</p>
      ) : (
        data?.map((order) => {
          return (
            <div key={order._id}>
              <p>Commande n°{order._id}</p>
              <p>Nom : {order.owner.username}</p>
              <p>Adresse de livraison : {order.address}</p>
              <p>{order.price} €</p>
              {!order.delivered ? (
                <p>Commande en attente de validation</p>
              ) : (
                <p>Commande livrée</p>
              )}
              {!order.delivered ? (
                <button
                  onClick={() => orderMutation.mutate(order._id)}
                  disabled={orderMutation.isPending}
                >
                  Marquer comme livrée
                </button>
              ) : (
                <button disabled>Commande livrée</button>
              )}
            </div>
          );
        })
      )}
    </main>
  );
};

export default Admin;
