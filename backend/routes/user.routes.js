import express from 'express'
import { getUsers,getUser, deleteUser , updateUser} from '../controller/user.controller.js';
import { authenticate } from '../middleware/auth.midleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), getUsers);
//router.get('/:id', authenticate, authorizeRoles('admin'),getUser);

router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser);
router.put("/:id", authenticate, authorizeRoles('admin'), updateUser);



export default router;