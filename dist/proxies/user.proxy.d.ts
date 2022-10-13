import { AuthorizableRequest } from '../interfaces/request.interface';
import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
export declare class UserProxy<User extends AuthorizableUser = AuthorizableUser> {
    private request;
    private getUserFromRequest;
    constructor(request: AuthorizableRequest<User>, getUserFromRequest: (request: AuthorizableRequest<User>) => User | undefined);
    get(): Promise<User | undefined>;
    getFromRequest(): User | undefined;
    getFromHook(): Promise<User | undefined>;
    private getRequest;
}
