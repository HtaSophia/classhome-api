import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Account } from "../account/account.entity";
import { ClassEntity } from "./class.entity";


@Table
export class ClassAccounts extends Model {
    @ForeignKey(() => Account)
    @PrimaryKey
    @Column
    public account_id: number;

    @ForeignKey(() => ClassEntity)
    @PrimaryKey
    @Column
    public class_id: number;
}