
export interface Ticket {
  id?: number;
  title: string;
  description?: string;
  user_id: number; 
  statut?:number
  created_at?: string;
}
