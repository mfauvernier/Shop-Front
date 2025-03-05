import { useState } from "react";
import axios from "axios";
import { useStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useStore((state) => state.login);

  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      const response = await axios.post(
        "https://site--shop-test--m7by8jdn4xzv.code.run/user/login",
        userData,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Connexion réussie", data);
      login({ username: "", email, password }, data.token);
      navigate("/products");
    },
    onError: (error) => {
      console.log("Erreur d'inscription :", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate({ email, password });
  };

  return (
    <main>
      <p className="m-4 mt-12 text-center text-2xl">Se connecter</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mx-10 my-4 border-1 p-3"
        />
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mx-10 my-4 border-1 p-3"
        />
        <button className="mx-10 mt-10 rounded-xl border-1 p-3">
          Se connecter
        </button>
      </form>
      <div className="mt-15 text-center">
        <p>Vous avez déjà un compte ? </p>
        <Link to="/users/signup">
          <p>Connectez-vous ici !</p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
