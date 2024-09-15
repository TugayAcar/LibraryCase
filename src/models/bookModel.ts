import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Book extends Model {
    public id!: number;
    public name!: string;
    public average_rating!: number;
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    average_rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'books',
});
