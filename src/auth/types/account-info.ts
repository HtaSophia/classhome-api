import { ObjectId } from '../../shared/types/object-id-helper';

export interface AccountInfo {
    _id: ObjectId;
    username: string;
    email: string;
    role: string;
}
