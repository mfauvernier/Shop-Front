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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12">
      <p className="mb-8 text-3xl font-semibold text-gray-800">Se connecter</p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border-2 border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 text-lg font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border-2 border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Vous n'avez pas encore de compte ?</p>
        <Link to="/users/signup">
          <p className="text-blue-500 hover:text-blue-600">
            Inscrivez-vous ici !
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
