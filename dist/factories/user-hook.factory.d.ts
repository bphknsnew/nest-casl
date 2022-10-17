import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { ModuleRef } from '@nestjs/core';
import { AuthorizableRequest } from 'interfaces/request.interface';
import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
import { UserBeforeFilterHook, UserBeforeFilterTuple } from '../interfaces/hooks.interface';
export declare class NullUserHook implements UserBeforeFilterHook {
    run(): Promise<undefined>;
}
export declare class TupleUserHook<Service> implements UserBeforeFilterHook {
    private service;
    private runFunc;
    constructor(service: Service, runFunc: (service: Service, user: AuthorizableUser) => Promise<AuthorizableUser | undefined>);
    run(user: AuthorizableUser): Promise<AuthorizableUser | undefined>;
}
export declare function userHookFactory(moduleRef: ModuleRef, request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>, hookOrTuple?: AnyClass<UserBeforeFilterHook> | UserBeforeFilterTuple): Promise<UserBeforeFilterHook>;
