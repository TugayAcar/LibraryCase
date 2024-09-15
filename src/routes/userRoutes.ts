import { Router } from 'express';
import { listUsers, getUser, createUser, borrow, returnBook } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/:userId/borrow/:bookId', borrow);   
router.post('/:userId/return/:bookId', returnBook);   

export default router;
