import { Ability, AnyAbility, Subject } from '@casl/ability';
import { DefaultActions } from '../actions.enum';
import { OptionsForFeature } from '../interfaces/options.interface';
import { AuthorizableUser } from '../interfaces/authorizable-user.interface';
export declare const nullConditionsMatcher: () => () => boolean;
export declare class AbilityFactory<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<Roles> = AuthorizableUser<Roles>> {
    private readonly featureOptions;
    constructor(featureOptions: OptionsForFeature<Roles, Subjects, Actions, User>);
    createForUser(user: User, abilityClass?: typeof Ability): AnyAbility;
}
