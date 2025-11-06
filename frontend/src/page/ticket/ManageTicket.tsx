import { useEffect, useState } from "react";
import { getTicketsff, deleteTicket } from "../../api/ticketService";
import { decodetoken } from "../../utiliy/DecodeToken"; 
import type { Ticket } from "../../types/ticket";
import CreateTicket from "../../components/tickets/CreateTicket";

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedRole = decodetoken(token);
      setRole(decodedRole);
    }
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("📥 Récupération des tickets...");
        setLoading(true);
        const response = await getTicketsff();
        console.log("🎫 Tickets récupérés :", response);
        setTickets(response);
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer la liste des tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression du ticket");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleViewDetails = (ticket: Ticket) => {
    alert(
      `Détails du ticket:\n\nTitre: ${ticket.title}\nDescription: ${ticket.description}\nStatus: ${ticket.status}`
    );
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        En cours de traitement...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-lg">{error}</div>
    );


  if (role !== "admin") {
    return null;
    
  }

  if (!tickets || tickets.length === 0)
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Aucun ticket trouvé
      </div>
    );

  return (
    <div className="pt-8">
    {/* <button className="bg-black text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-800">
        + Créer un Ticket
      </button>*/}
<CreateTicket />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Titre</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="bg-white border-b border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {ticket.title}
                </td>
                <td className="px-6 py-4">{ticket.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4">{ticket.user_id}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <button
                    onClick={() => handleViewDetails(ticket)}
                    className="text-indigo-600 hover:underline"
                  >
                    Voir
                  </button>

                  <button className="text-blue-600 hover:underline">
                    Éditersss
                  </button>

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
