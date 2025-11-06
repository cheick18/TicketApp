import { useState, useContext } from "react";
import { createTicket } from "../../api/ticketService";
import { AuthContext } from "../../context/AuthContext";
import type { CreateTicketProps } from "../../types/CreateTicketProps";
import { decodetoken } from "../../utiliy/DecodeToken";


export default function CreateTicketComponent({onTicketCreated}:CreateTicketProps) {
  const { token, user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const role= decodetoken(token); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
  });
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const ticketData = {
      ...formData,
      user_id: user?.id,
    };

    try {
      setLoading(true);
      const newTicket = await createTicket(ticketData);
      console.log(`Ticket créé avec succès ! ID: ${newTicket.id}`);
      setFormData({ title: "", description: "", status: "open" });
      if(newTicket.id)  onTicketCreated(newTicket)
      setShowForm(false); 
    } catch (err) {
      alert("Erreur lors de la création du ticket !");
      console.error(err);
    } finally {
     
      setLoading(false);
    }
  };
 
  if(role!=='user')
    return null;

  return (
    <div className="p-4 w-full flex items-center justify-center">
 <div className=" w-full px-8">


    {showForm?(null):(  <button
        onClick={() => setShowForm(!showForm)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
      Create Ticket
      </button>)}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-md"
        >
          <h2 className="text-lg font-semibold mb-4">Créer un nouveau ticket</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Titre du ticket"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Décrivez le problème..."
              rows={3}
              required
            ></textarea>
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
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer le ticket"}
          </button>
        </form>
      )}
      </div>
    </div>
  );
}
