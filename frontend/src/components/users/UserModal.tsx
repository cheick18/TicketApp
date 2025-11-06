import { useState, useEffect } from "react";
import { updateUser } from "../../api/userService"; 
import { decodetoken } from "../../utiliy/DecodeToken";
import type { UpdateUserProps } from "../../types/UpdateUserProps";

export default function UserModal({ user, onUserUpdated }: UpdateUserProps) {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(user.id, formData);
      onUserUpdated(updatedUser);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de l'utilisateur !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton d’édition */}
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-600 hover:underline"
      >
        éditer
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Modifier l'utilisateur</h2>

          
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Mise à jour..." : "Valider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
