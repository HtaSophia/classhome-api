import { AccountService } from './../account/account.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CLASS_REPOSITORY } from './class.constants';
import { Class } from './class.entity';
import { ClassDto } from './class.dto';
import { Account } from 'src/account/account.entity';
import { ACCOUNT_REPOSITORY } from 'src/account/account constants';

@Injectable()
export class ClassService {
    constructor(
        @Inject(CLASS_REPOSITORY)
        private classRepository: typeof Class,
        private accountService: AccountService
        ){}

        public async create(dto: ClassDto): Promise<Class> {
            const professorBd = await this.accountService.findById(dto.professor_id);
            
            if (!professorBd) {
                throw new NotFoundException("Professor não encontrado")
            }
            
            const {name, description, professor_id} = dto 
            return await this.classRepository.create({name, description, professor_id, professorBd});
        }
}
