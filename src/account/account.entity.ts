import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Account extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public password: string;

    @Column({
        type: DataType.ENUM,
        values: ['professor', 'student'],
        allowNull: false,
    })
    public role: string;
}
