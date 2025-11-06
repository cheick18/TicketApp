import type { Ticket } from "./ticket";

export interface updateTicketProps {
   ticket: Ticket; 
  onTicketUpdated?: (ticket: Ticket) => void;
}