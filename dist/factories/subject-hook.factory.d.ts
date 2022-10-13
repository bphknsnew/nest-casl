import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { ContextId, ModuleRef } from '@nestjs/core';
import { AuthorizableRequest } from '../interfaces/request.interface';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple } from '../interfaces/hooks.interface';
export declare class NullSubjectHook implements SubjectBeforeFilterHook {
    run(): Promise<undefined>;
}
export declare class TupleSubjectHook<Service> implements SubjectBeforeFilterHook {
    private service;
    private runFunc;
    constructor(service: Service, runFunc: (service: Service, request: AuthorizableRequest) => Promise<AnyObject | undefined>);
    run(request: AuthorizableRequest): Promise<AnyObject | undefined>;
}
export declare function subjectHookFactory(moduleRef: ModuleRef, contextId: ContextId, hookOrTuple?: AnyClass<SubjectBeforeFilterHook> | SubjectBeforeFilterTuple): Promise<SubjectBeforeFilterHook>;
