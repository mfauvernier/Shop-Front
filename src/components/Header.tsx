import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const token = useStore((state) => state.token);
  const total = useStore((state) => state.totalPrice);
  const admin = useStore((state) => state.admin);

  return (
    <div className="flex justify-between p-8">
      <button onClick={() => navigate("/")} className="text-xl">
        Accueil
      </button>
      {!token ? (
        <div className="flex justify-between gap-3">
          <button onClick={() => navigate("/users/login")} className="text-xl">
            Se connecter
          </button>
          <button onClick={() => navigate("/users/signup")} className="text-xl">
            S'inscrire
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate("/products")}
              className="rounded-2xl border-2 p-2 text-xl"
            >
              Produits
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="rounded-2xl border-2 p-2 text-xl"
            >
              {total.toFixed(2)} €
            </button>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="rounded-2xl border-2 p-2 text-xl"
          >
            Déconnexion
          </button>
          <div>
            {admin === true && (
              <button onClick={() => navigate("/admin")} className="text-xl">
                Consulter les commandes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
