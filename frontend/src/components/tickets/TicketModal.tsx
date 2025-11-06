import { useState, useEffect, useContext } from "react";

import { updateTicket } from "../../api/ticketService"; // ta fonction d'API
import type { updateTicketProps } from "../../types/UpdateTicketProps";
import { AuthContext } from "../../context/AuthContext";
import { decodetoken } from "../../utiliy/DecodeToken";


export default function TicketModal({ ticket, onTicketUpdated }: updateTicketProps) {
  const [showModal, setShowModal] = useState(false);
     const token = localStorage.getItem("token");
    console.log("role**************",decodetoken(token).role)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
  });
  const [loading, setLoading] = useState(false);

  // Préremplir le formulaire quand le ticket change
  useEffect(() => {
    if (ticket) {
       
      setFormData({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
      });
    }
  }, [ticket]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
     const upadteTicket= await updateTicket(ticket.id, formData); 
      setShowModal(false);
      onTicketUpdated(upadteTicket)
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 👇 même bouton que dans ton UI d’origine */}
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-600 hover:underline"
      >
        éditer
      </button>

      {/* 👇 le modal, strictement identique à ton original */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Modifier le ticket</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Titre</label>
            {decodetoken(token).role === "admin" ? (
  <>
  
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
    />
            
  </>
) : (
  <>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      disabled
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 cursor-not-allowed"
    />
  </>
)}

            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
            
              {decodetoken(token).role === "admin" ? (
  <>
  
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
      rows={3} />
    
  </>
) : (
  <>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      disabled
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 cursor-not-allowed"
      rows={3}
    />
  </>
)}

            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
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
