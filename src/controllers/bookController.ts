import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { createBookSchema } from '../validators/bookValidator';
import { validate } from '../middlewares/validate';

const bookService = new BookService();

export const listBooks = async (req: Request, res: Response) => {
    const books = await bookService.listBooks();
    res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
    const book = await bookService.getBook(Number(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};


export const createBook = [
    validate(createBookSchema),
    async (req: Request, res: Response) => {
        const book = await bookService.createBook(req.body.name, req.body.average_rating);
        res.status(201).json(book);
    },
];
