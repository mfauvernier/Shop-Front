import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const reset = useStore((state) => state.resetCart);
  const token = useStore((state) => state.token);
  const total = useStore((state) => state.totalPrice);
  const admin = useStore((state) => state.admin);
  const cart = useStore((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-gray-800 transition-all hover:text-blue-500"
        >
          Accueil
        </button>
        {!token ? (
          <div className="flex gap-6">
            <button
              onClick={() => navigate("/users/login")}
              className="text-xl text-gray-700 transition-all hover:text-blue-500"
            >
              Se connecter
            </button>
            <button
              onClick={() => navigate("/users/signup")}
              className="text-xl text-gray-700 transition-all hover:text-blue-500"
            >
              S'inscrire
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-6">
              <button
                onClick={() => navigate("/products")}
                className="rounded-lg border-2 border-gray-300 px-6 py-2 text-xl text-gray-700 transition-all hover:bg-gray-200"
              >
                Produits
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="relative rounded-lg border-2 border-gray-300 px-6 py-2 text-xl text-gray-700 transition-all hover:bg-gray-200"
              >
                {total.toFixed(2)} €
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            <button
              onClick={() => {
                reset();
                logout();
                navigate("/");
              }}
              className="rounded-lg border-2 border-gray-300 px-6 py-2 text-xl text-gray-700 transition-all hover:bg-gray-200"
            >
              Déconnexion
            </button>
            {admin && (
              <button
                onClick={() => navigate("/admin")}
                className="text-xl text-gray-700 transition-all hover:text-blue-500"
              >
                Consulter les commandes
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
