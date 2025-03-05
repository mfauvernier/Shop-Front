import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const token = useStore((state) => state.token);
  const total = useStore((state) => state.totalPrice);
  const admin = useStore((state) => state.admin);

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      {!token ? (
        <div>
          <button onClick={() => navigate("/users/login")}>Se connecter</button>
          <button onClick={() => navigate("/users/signup")}>S'inscrire</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/products")}>Page Produit</button>
          <button onClick={() => navigate("/cart")}>
            {total.toFixed(2)} €
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Déconnexion
          </button>
          {admin === true && (
            <button onClick={() => navigate("/admin")}>Admin</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
