import { Sequelize } from 'sequelize-typescript';
import { ClassEntity } from '../class/class.entity';
import { Account } from '../account/account.entity';
import { ClassAccounts } from 'src/class/class.accounts.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (): Promise<Sequelize> => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'classhome',
            });

            sequelize.addModels([Account, ClassEntity, ClassAccounts]);

            await sequelize.sync();
            return sequelize;
        },
    },
];
