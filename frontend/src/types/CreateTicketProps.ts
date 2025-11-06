import type { Ticket } from "./ticket";

export interface CreateTicketProps {
  onTicketCreated?: (ticket: Ticket) => void;
}