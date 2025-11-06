
import type { Ticket } from '../types/ticket';
import type { apiTicketResponse } from '../types/ticketResponse';

export const getTicketsff = async (): Promise<apiTicketResponse[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token manquant, veuillez vous connecter.");
  }

  try {
    const response = await fetch("http://localhost:3000/api/tickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des tickets :", error.message);
    throw error;
  }
};

export const deleteTicket = async (id: number) => {
  const token = localStorage.getItem("token");
   if (!token) {
    throw new Error("Token manquant, veuillez vous connecter.");
  }
  const response = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression du ticket");
  return response.json();
};

export const updateTicket = async (id: number, newticket:Ticket) => {
  const token = localStorage.getItem("token");
   if (!token) {
    throw new Error("Token is missing....");
  }
  const response = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newticket),
  });

  if (!response.ok) throw new Error("Erreur during ticket updating");
  return response.json();
};

export const createTicket = async (ticketData: {
  title: string;
  description: string;
  status: string;
  user_id: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) throw new Error("Erreur lors de la création du ticket");
  
  return response.json();
};

