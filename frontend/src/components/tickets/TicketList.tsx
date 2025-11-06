import { useEffect, useState } from "react";
import { getTicketsff, deleteTicket, updateTicket } from "../../api/ticketService";
import { decodetoken } from "../../utiliy/DecodeToken";
import type { Ticket } from "../../types/ticket";
import CreateTicketComponent from "./CreateTicket";
import TicketModal from "./TicketModal";
import TicketsCharts from "./ChaartTicket";

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodetoken(token);
      setRole(decoded?.role || decoded); 
    }
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await getTicketsff();
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

  const handleTicketCreated = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

 const handleTicketUpdated = (updatedTicket: Ticket) => {
  setTickets((prev) =>
    prev.map((ticket) =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    )
  );
};

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Erreur lors de la suppression du ticket");
    }
  };

  const handleViewDetails = (ticket: Ticket) => {
    alert(
      `📄 Détails du ticket:\n\nTitre: ${ticket.title}\nDescription: ${ticket.description}\nStatut: ${ticket.status}`
    );
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
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

  return (
    <div className="pt-8">
      <CreateTicketComponent onTicketCreated={handleTicketCreated} />

      <div className="pt-6">
        <p>Le dashborad ici</p>
         < TicketsCharts   tickets={tickets}/>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Titre</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Statut</th>

              {(role === "admin" || role === "support") && (
                <th className="px-6 py-3 text-right">Actions</th>
              )}
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

                {(role === "admin") && (
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button
                      onClick={() => handleViewDetails(ticket)}
                      className="text-indigo-600 hover:underline"
                    >
                      Voir
                    </button>

                    {(role === "admin")  && (
                      <>
                     
                    <TicketModal
      ticket={ticket} onTicketUpdated={handleTicketUpdated}
    
    />
                  
                      {/*
                        <button className="text-blue-600 hover:underline">
                          Éditer
                        </button>
                    */}
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </td>
                )}
                {(role==='support')&&(<><td> <TicketModal
      ticket={ticket} onTicketUpdated={handleTicketUpdated}
    
    /></td></>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
