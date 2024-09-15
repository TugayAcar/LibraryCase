import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from '../models/userModel';
import { Book } from '../models/bookModel';

export class BorrowedBook extends Model {
  
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowedAt!: Date;
  public returnedAt: Date | null | undefined;
  public rating!: number | null;
}

BorrowedBook.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  sequelize,
  tableName: 'borrowings'
});
