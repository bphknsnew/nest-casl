import { ContextType, ExecutionContext } from '@nestjs/common';
import { AuthorizableRequest } from '../interfaces/request.interface';
export declare type GqlContextType = 'graphql' | ContextType;
export declare class ContextProxy {
    private readonly context;
    constructor(context: ExecutionContext);
    static create(context: ExecutionContext): ContextProxy;
    getRequest(): Promise<AuthorizableRequest>;
}
