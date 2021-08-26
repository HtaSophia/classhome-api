import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Account } from "../account/account.entity";
import { Class } from "./class.entity";


@Table
export class ClassAccounts extends Model {
    @ForeignKey(() => Class)
    @Column({
        type: DataType.INTEGER,
        references: {model: 'Class', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })
    public class_id: number;
    
    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        references: {model: 'Account', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })
    public account_id: number;
}