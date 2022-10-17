import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { ContextId, ContextIdFactory, ModuleRef } from '@nestjs/core';

import { AuthorizableRequest } from '../interfaces/request.interface';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple } from '../interfaces/hooks.interface';
import { AuthorizableUser } from 'interfaces/authorizable-user.interface';
const map = new Map<string, ContextId>();
export class NullSubjectHook implements SubjectBeforeFilterHook {
  public async run(): Promise<undefined> {
    return undefined;
  }
}

// TODO request generic params
export class TupleSubjectHook<Service> implements SubjectBeforeFilterHook {
  constructor(
    private service: Service,
    private runFunc: (service: Service, request: AuthorizableRequest) => Promise<AnyObject | undefined>,
  ) {}

  public async run(request: AuthorizableRequest): Promise<AnyObject | undefined> {
    return this.runFunc(this.service, request);
  }
}

export async function subjectHookFactory(
  moduleRef: ModuleRef,
  request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  hookOrTuple?: AnyClass<SubjectBeforeFilterHook> | SubjectBeforeFilterTuple,
): Promise<SubjectBeforeFilterHook> {
  if (!hookOrTuple) {
    return new NullSubjectHook();
  }
  if (Array.isArray(hookOrTuple)) {
    const [ServiceClass, runFunction] = hookOrTuple;
    const service = moduleRef.get(ServiceClass, { strict: false });
    return new TupleSubjectHook<typeof ServiceClass>(service, runFunction);
  }

  const tenantHeader = request.headers['x-tenant-id'];

  if (!map.has(tenantHeader)) {
    map.set(tenantHeader, ContextIdFactory.getByRequest(request));
    await moduleRef.create<SubjectBeforeFilterHook>(hookOrTuple);
  }
  const contextId = map.get(tenantHeader);
  return moduleRef.resolve(hookOrTuple, contextId);
}
