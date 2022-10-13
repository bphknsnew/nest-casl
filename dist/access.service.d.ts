import { AnyObject, Subject } from '@casl/ability/dist/types/types';
import { AuthorizableRequest } from './interfaces/request.interface';
import { AbilityFactory } from './factories/ability.factory';
import { AbilityMetadata } from './interfaces/ability-metadata.interface';
import { AuthorizableUser } from './interfaces/authorizable-user.interface';
export declare class AccessService {
    private abilityFactory;
    constructor(abilityFactory: AbilityFactory);
    hasAbility(user: AuthorizableUser, action: string, subject: Subject): boolean;
    assertAbility(user: AuthorizableUser, action: string, subject: Subject): void;
    canActivateAbility<Subject = AnyObject>(request: AuthorizableRequest, ability?: AbilityMetadata<Subject>): Promise<boolean>;
}
