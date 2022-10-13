import { AnyObject } from '@casl/ability/dist/types/types';
import { AuthorizableRequest } from '../interfaces/request.interface';
import { CaslRequestCache } from '../interfaces/casl-request-cache.interface';
import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
import { SubjectBeforeFilterHook, UserBeforeFilterHook } from '../interfaces/hooks.interface';
import { ConditionsProxy } from './conditions.proxy';
export declare class RequestProxy<User extends AuthorizableUser = AuthorizableUser, Subject = AnyObject> {
    private request;
    private readonly defaultCaslCache;
    constructor(request: AuthorizableRequest<User, Subject>);
    get cached(): CaslRequestCache<User, Subject>;
    getConditions(): ConditionsProxy | undefined;
    setConditions(conditions: ConditionsProxy): void;
    getSubject(): Subject | undefined;
    setSubject(subject: Subject | undefined): void;
    getUser(): User | undefined;
    setUser(user: User | undefined): void;
    getUserHook(): UserBeforeFilterHook<User>;
    setUserHook(hook: UserBeforeFilterHook<User>): void;
    getSubjectHook(): SubjectBeforeFilterHook<Subject>;
    setSubjectHook(hook: SubjectBeforeFilterHook<Subject>): void;
}
