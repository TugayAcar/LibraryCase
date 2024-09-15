import { Op } from 'sequelize';
import { BorrowedBook } from '../models/borrowedBookModel';

export class BorrowedBookService {
    public async create(userId: any, bookId: any, borrowedAt: Date) {
        return BorrowedBook.create({ userId, bookId, borrowedAt });
    }
    
    public async findBorrowedBookById(id: number) {
        return BorrowedBook.findOne({
            where: {
                bookId: id,
                returnedAt: null
            }
        });
    }

    public async findUserBorrowedBookById(userId: number, bookId: number) {
        return BorrowedBook.findOne({
            where: {
                userId: userId,
                bookId: bookId,
                returnedAt: null
            }
        });
    }

    public async getCountsByBookId(bookId: number) {
        return BorrowedBook.count({ where: { bookId, rating: { [Op.not]: null } } });
    }

    public async getSumOfRatingsByBookId(bookId: number) {
        return BorrowedBook.sum('rating', { where: { bookId, rating: { [Op.not]: null } } });
    }
}
