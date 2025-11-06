import express from 'express'

import { createTicket, deleteTicket, getAllTickets, getTicket, updateTicket, updateTicketStatus} from '../controller/ticketcontroller.js';
import { authenticate } from '../middleware/auth.midleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();
router.get('/:id', authenticate, authorizeRoles('user','support','admin'), getTicket)
router.get('/', authenticate, authorizeRoles('user','admin','support'), getAllTickets)
router.post('/', authenticate, authorizeRoles('user'), createTicket);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteTicket);
router.put('/:id', authenticate, authorizeRoles('admin','support'), updateTicket);
export default router;