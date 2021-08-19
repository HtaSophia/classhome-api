import { BelongsToMany, Column, DataType, Model } from "sequelize-typescript";
import { Account } from "src/account/account.entity";
import { AccountService } from "src/account/account.service";

export class ClassEntity extends Model {
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
    public description: string

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    public professor: number;


    // @BelongsToMany(() => Account, 'ClassAccounts')
    // public students: Account[];

}