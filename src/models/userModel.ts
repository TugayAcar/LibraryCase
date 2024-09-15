import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
    public id!: number;
    public name!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'users',
});
