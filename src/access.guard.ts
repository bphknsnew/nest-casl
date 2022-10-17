import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { AccessService } from './access.service';
import { CaslConfig } from './casl.config';
import { CASL_META_ABILITY } from './casl.constants';
import { subjectHookFactory } from './factories/subject-hook.factory';
import { userHookFactory } from './factories/user-hook.factory';
import { AbilityMetadata } from './interfaces/ability-metadata.interface';
import { ContextProxy } from './proxies/context.proxy';
import { RequestProxy } from './proxies/request.proxy';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly accessService: AccessService,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ability = this.reflector.get<AbilityMetadata | undefined>(CASL_META_ABILITY, context.getHandler());
    const request = await ContextProxy.create(context).getRequest();
    const { getUserHook } = CaslConfig.getRootOptions();
    const req = new RequestProxy(request);
    req.setUserHook(await userHookFactory(this.moduleRef, request, getUserHook));
    req.setSubjectHook(await subjectHookFactory(this.moduleRef, request, ability?.subjectHook));

    return await this.accessService.canActivateAbility(request, ability);
  }
}
