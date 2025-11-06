import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { loginUser } from "../../api/authServices";

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("test du backend");
      const response = await loginUser(email, password);
      const { user, token, success, message } = response;

      if (token) {
        setEmail("");
        setPassword("");
        auth.login(user as User, token);
        navigate("/");
      }

      if (success === false) setError(message);
    } catch (err: any) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* --- LOGO --- */}
        <div className="flex justify-center mb-6">
          {/* 🔸 Remplace cette div par une vraie image si tu veux */}
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/assets/logo.png" // 👉 mets le chemin vers ton logo ici
              alt="Logo"
              className="w-full h-full object-contain"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <span className="text-gray-500 text-sm">Logo</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Connexion</h1>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Entrer votre email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Entrer votre mot de passe"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Vous n’avez pas encore de compte ?{" "}
          <a href="/register" className="text-black hover:underline">
            Créez-en un
          </a>
        </p>
      </div>
    </div>
  );
}
