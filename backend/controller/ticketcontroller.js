import { pool } from "../config/_db.js";
import { TickeModel } from "../model/ticket.model.js";

export const createTicket = async (req, res) => {
    try {
      const { title, description } = req.body;
      const user_id = req.user.id;

     
      if (!title) return res.status(400).json({ message: "Ttitle is require" });
  console.log ("ççççççuser id session**********", req.user.id)
      
      const ticket = await TickeModel.createTicket({ title, description, user_id });
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Erreur création ticket", error });
    }
  }


export const getAllTickets = async (req, res ) => {

  try {
    
    const userRole = req.user.role;
    const userId = req.user.id
    console.log("inofo a send",userRole,userId)
      const tickets = await TickeModel.getAllTickets(userRole,userId);
      console.log("la liste de ticket",tickets)
      res.json(tickets);
  } catch (error) {

     res.status(500).json([]);
    
  }
}

/* entre ............. */
  export const getTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await TickeModel.findById(id);

      if (!ticket) return res.status(404).json({ message: "Ticket introuvable" });
      if (ticket.user_id !== req.user.id) return res.status(403).json({ message: "Accès refusé" });

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Erreur lecture ticket", error });
    }
  }

export const updateTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const role= req.user.role; 
      console.log("role du suer update",role)
      console.log(title,description,status)
      if(!title || !status)
        return res.status(404).json({ message: "Verifier vos valeur" });

      const updated = await TickeModel.updateTicket(role, id, { title, description, status });

      if (!updated) return res.status(404).json({ message: "Ticket introuvable ou non autorisé" });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Erreur mise à jour ticket", error });
    }
  }

export const updateTicketStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowed = ["open", "in-progress", "resolved", "closed"];
      if (!allowed.includes(status))
        return res.status(400).json({ message: "Statut invalide" });   
      const ticket = await TickeModel.findById(id);
      if(ticket && ticket.status!=='open') return res.status(404).json({ message: "Not allowed to update this ticket" });
      const updated = await TickeModel.updateStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Ticket not found" });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Erreur mise à jour statut", error });
    }
  };
  
export const deleteTicket = async (req, res) => {
    try {
      const { id } = req.params;
  console.log("id du ticker à supprimer",id)
      const deleted = await TickeModel.deleteTicket(id);
      if (deleted) {return (res.status(404).json({succes:false, message: "Ticket introuvable ou non autorisé" }))}

     return res.json({succes:true, message: "Ticket deleted" });
    } catch (error) {
      res.status(500).json({succes:false, message: error });
    }
  
  }
