import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { BorrowedBookService } from '../services/borrowedBookService';
import { BookService } from '../services/bookService';
import { createUserSchema, returnBookRequest } from '../validators/userValidator';
import { validate } from '../middlewares/validate';

const userService = new UserService();
const bookService = new BookService();
const borrowedBookService = new BorrowedBookService();

export const listUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (error) {
        console.error('Error listUsers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUser(Number(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error getUser:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = [
    validate(createUserSchema),
    async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body.name);
        res.status(201).json(user);
    },
];

export const borrow = async (req: Request, res: Response) => {
    try {
        const { userId, bookId } = req.params;

        const user = await userService.getUser(Number(userId));
        if(!user)
            res.status(404).json({ message: 'User not found' });
        
        const book = await bookService.getBook(Number(bookId));
        if (!book)
            res.status(404).json({ message: 'Book not found' });

        const existingBorrowing = await borrowedBookService.findBorrowedBookById(Number(bookId));
        
        if (existingBorrowing) {
            return res.status(400).json({ error: 'Book is already borrowed' });
        }
        
        const borrowing = await borrowedBookService.create(userId, bookId, new Date());
        
        res.status(201).json(borrowing);
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const returnBook = [
    validate(returnBookRequest),
    async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const bookId = Number(req.params.bookId);
            const score = req.body.score;
    
            const user = await userService.getUser(userId);
            if(!user)
                res.status(404).json({ message: 'User not found' });
            
            const book = await bookService.getBook(bookId);
            if (!book)
                res.status(404).json({ message: 'Book not found' });
    
            let borrowing = await borrowedBookService.findUserBorrowedBookById(userId, bookId);
            
            if (!borrowing) {
                return res.status(400).json({ error: 'Book did not borrowed' });
            }
            
            borrowing.returnedAt = new Date();
            borrowing.rating = score ?? null; 
            await borrowing.save();
    
            if (score) {
                const book = await bookService.getBook(bookId);
                if (book) {
                    const totalBorrowings = await borrowedBookService.getCountsByBookId(bookId);
                    const totalRating = await borrowedBookService.getSumOfRatingsByBookId(bookId);
                    book.average_rating = totalRating / totalBorrowings;
                    await book.save();
                }
            }
            res.status(201).json(borrowing);
        } catch (error) {
            console.error('Error return book:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
]