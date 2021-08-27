import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ObjectId, ObjectIdTransform } from '../shared/types/object-id-helper';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
    private readonly logger: Logger;

    constructor() {
        this.logger = new Logger(ObjectIdPipe.name);
    }

    public transform(value: string, _metadata: ArgumentMetadata): ObjectId {
        try {
            const _id = ObjectIdTransform(value);
            return _id;
        } catch (error) {
            this.logger.error((error as Error).message);
            throw new BadRequestException('Invalid Id parameter!');
        }
    }
}
