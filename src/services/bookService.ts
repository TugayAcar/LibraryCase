import { Book } from '../models/bookModel';

export class BookService {

    public async listBooks() {
        return Book.findAll();
    }

    public async getBook(id: number) {
        return Book.findByPk(id);
    }

    public async createBook(name: string, average_rating: number) {
        return Book.create({ name, average_rating });
    }
}
