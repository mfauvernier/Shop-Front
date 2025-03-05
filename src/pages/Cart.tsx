import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useStore();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold text-gray-800">Panier</h1>
      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          Votre panier est vide
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-gray-600">
                    {item.price.toFixed(2)} € X {item.quantity}
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
                  >
                    <span className="text-xl">-</span>
                  </button>
                  <p className="text-xl font-semibold">{item.quantity}</p>
                  <button
                    onClick={() => increaseQuantity({ ...item, quantity: 1 })}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
                  >
                    <span className="text-xl">+</span>
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/payment")}
              className="rounded-lg bg-green-600 px-6 py-3 text-white shadow-md hover:bg-green-700 focus:outline-none"
            >
              Aller au paiement
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
