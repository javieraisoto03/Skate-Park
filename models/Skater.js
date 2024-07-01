import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Skater = sequelize.define('Skater', {
    email: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    anos_experiencia: { type: DataTypes.INTEGER, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    foto: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    tableName: 'skaters',
    timestamps: false,
});

export default Skater;

