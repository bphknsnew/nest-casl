import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { AuthorizableRequest } from 'interfaces/request.interface';

import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
import { UserBeforeFilterHook, UserBeforeFilterTuple } from '../interfaces/hooks.interface';

export class NullUserHook implements UserBeforeFilterHook {
  public async run(): Promise<undefined> {
    return undefined;
  }
}

// TODO request generic params
export class TupleUserHook<Service> implements UserBeforeFilterHook {
  constructor(
    private service: Service,
    private runFunc: (service: Service, user: AuthorizableUser) => Promise<AuthorizableUser | undefined>,
  ) {}

  public async run(user: AuthorizableUser): Promise<AuthorizableUser | undefined> {
    return this.runFunc(this.service, user);
  }
}

export async function userHookFactory(
  moduleRef: ModuleRef,
  request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  hookOrTuple?: AnyClass<UserBeforeFilterHook> | UserBeforeFilterTuple,
): Promise<UserBeforeFilterHook> {
  if (!hookOrTuple) {
    return new NullUserHook();
  }
  if (Array.isArray(hookOrTuple)) {
    const [ServiceClass, runFunction] = hookOrTuple;
    const service = moduleRef.get(ServiceClass);
    return new TupleUserHook<typeof ServiceClass>(service, runFunction);
  }
  const contextId = ContextIdFactory.getByRequest(request);
  let hook: UserBeforeFilterHook;
  try {
    hook = await moduleRef.resolve<UserBeforeFilterHook>(hookOrTuple, contextId, {
      strict: false,
    });
  } catch (err) {
    hook = await moduleRef.create<UserBeforeFilterHook>(hookOrTuple);
  }

  return hook;
}
