import { Ability, AnyAbility, AbilityTuple, AbilityBuilder, Subject } from '@casl/ability';
import { AnyClass } from '@casl/ability/dist/types/types';
import { DefaultActions } from '../actions.enum';
import { AuthorizableUser } from './authorizable-user.interface';
export declare class UserAbilityBuilder<Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser = AuthorizableUser> extends AbilityBuilder<AnyAbility> {
    user: User;
    permissions: AnyPermissions<string, Subjects, Actions, User>;
    constructor(user: User, permissions: AnyPermissions<string, Subjects, Actions, User>, AbilityType: AnyClass<Ability<AbilityTuple<Actions, Subjects>>>);
    extend: (role: string) => void;
    permissionsFor(role: string): void;
}
export declare type DefinePermissions<Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser = AuthorizableUser> = (builder: UserAbilityBuilder<Subjects, Actions, User>) => void;
export declare type Permissions<Roles extends string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser = AuthorizableUser<Roles>> = Partial<Record<Roles | 'every' | 'everyone', DefinePermissions<Subjects, Actions, User>>>;
export declare type AnyPermissions<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = string, User extends AuthorizableUser = AuthorizableUser<Roles>> = Permissions<Roles, Subjects, Actions, User>;
