import { Subject } from '@casl/ability';
import { DynamicModule } from '@nestjs/common';
import { DefaultActions } from './actions.enum';
import { OptionsForFeature, OptionsForRoot, OptionsForRootAsync } from './interfaces/options.interface';
import { AuthorizableUser } from './interfaces/authorizable-user.interface';
import { AuthorizableRequest } from './interfaces/request.interface';
export declare class CaslModule {
    static forFeature<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser = AuthorizableUser<Roles>>(options: OptionsForFeature<Roles, Subjects, Actions, User>): DynamicModule;
    static forRoot<Roles extends string = string, User extends AuthorizableUser = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>>(options: OptionsForRoot<Roles, User, Request>): DynamicModule;
    static forRootAsync<Roles extends string = string, User extends AuthorizableUser = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>>(options: OptionsForRootAsync<Roles, User, Request>): DynamicModule;
}
