import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useStore } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useStore((state) => state.login);

  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationFn: async (userData: {
      username: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post(
        "https://site--shop-test--m7by8jdn4xzv.code.run/user/signup",
        userData,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Inscription réussie", data);
      login({ username, email, password }, data.token);
      navigate("/products");
    },
    onError: (error) => {
      console.log("Erreur d'inscription :", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <main>
      <p className="m-4 mt-12 text-center text-2xl">S'inscrire</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Entrez ici votre nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mx-10 my-4 border-1 p-3"
        />
        <input
          type="email"
          placeholder="Entrez ici votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mx-10 my-4 border-1 p-3"
        />
        <input
          type="password"
          placeholder="Entrez ici votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mx-10 my-4 border-1 p-3"
        />
        <button className="mx-10 mt-10 rounded-xl border-1 p-3">
          {userMutation.isPending ? "Chargement ..." : "S'inscrire"}
        </button>
      </form>
      <div className="mt-15 text-center">
        <p>Vous n'avez pas encore de compte ? </p>
        <Link to="/users/login">
          <p>Inscrivez-vous ici !</p>
        </Link>
      </div>
    </main>
  );
};

export default Signup;
