import { useState } from "react";
import axios from "axios";
import { useStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Se connecter</button>
      </form>
    </main>
  );
};

export default Login;
