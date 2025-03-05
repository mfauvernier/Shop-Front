import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

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
        "https://site--shop-test--m7by8jdn4xzv.code.run/signup",
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>
          {userMutation.isPending ? "Chargement ..." : "S'inscrire"}
        </button>
      </form>
    </main>
  );
};

export default Signup;
