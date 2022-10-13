import { AnyObject } from '@casl/ability/dist/types/types';
import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
import { AuthorizableRequest } from '../interfaces/request.interface';
export declare class SubjectProxy<Subject = AnyObject> {
    private request;
    constructor(request: AuthorizableRequest<AuthorizableUser, Subject>);
    get(): Promise<Subject | undefined>;
    private getRequest;
}
