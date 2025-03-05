import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useStore();
  return (
    <main>
      <h1>Panier</h1>
      {cart.length === 0 ? (
        <p>Panier Vide</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>
                {item.price.toFixed(2)} € X {item.quantity}
              </p>
              <p>{(item.price * item.quantity).toFixed(2)} €</p>
              <button onClick={() => decreaseQuantity(item._id)}>-</button>
              <p>{item.quantity}</p>
              <button
                onClick={() => increaseQuantity({ ...item, quantity: 1 })}
              >
                +
              </button>
              <button onClick={() => removeFromCart(item._id)}>
                Supprimer
              </button>
            </div>
          ))}
          <button onClick={() => navigate("/payment")}>Paiement</button>
        </>
      )}
    </main>
  );
};

export default Cart;
