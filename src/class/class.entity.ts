import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Account } from '../account/account.entity';
import { ClassAccounts } from './class.accounts.entity';


@Table
export class Class extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    })
    public name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [3, 120]
        }
    })
    public description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public professor_id: number;

    @BelongsToMany(() => Account, () => ClassAccounts)
    public integrants: Array<Account> = new Array();
}