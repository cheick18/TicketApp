export interface apiTicketResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}
