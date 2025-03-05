import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="relative flex h-[500px] items-center justify-center bg-cover bg-center text-center text-gray-900">
        <div className="rounded-xl bg-white/80 p-8 shadow-lg">
          <h1 className="text-4xl font-bold">
            Bienvenue dans notre boutique !
          </h1>
          <p className="mt-4 text-lg">
            Découvrez nos collections exclusives et trouvez ce qui vous
            correspond.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/products"
              className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
            >
              Explorer la boutique
            </Link>
            <Link
              to="/users/signup"
              className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
            >
              S'inscrire
            </Link>
            <Link
              to="/users/login"
              className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
