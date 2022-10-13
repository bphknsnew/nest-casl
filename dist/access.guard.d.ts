import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AccessService } from './access.service';
export declare class AccessGuard implements CanActivate {
    private reflector;
    private readonly accessService;
    private moduleRef;
    constructor(reflector: Reflector, accessService: AccessService, moduleRef: ModuleRef);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
