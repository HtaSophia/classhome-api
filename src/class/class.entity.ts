import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';

@Table
export class ClassEntity extends Model {
    @Column({
        type: DataType.NUMBER, 
        allowNull: false,
    })
    public professor: number;

    @Column({
        type: DataType.STRING,
        validate: {
            len: [3, 45]
        },
        allowNull: false,
    })
    public name: string;

    @Column({
        type: DataType.STRING,
        validate: {
            len:[3, 120]
        },
        allowNull: true,
    })
    public description: string;

    @BelongsToMany(() => Account, 'ClassesAccounts')
    students: Account[]
}
