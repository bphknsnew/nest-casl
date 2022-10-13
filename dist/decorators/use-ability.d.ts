import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { CustomDecorator } from '@nestjs/common';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple } from '../interfaces/hooks.interface';
import { AuthorizableRequest } from '../interfaces/request.interface';
export declare function UseAbility<Subject = AnyObject, Request = AuthorizableRequest>(action: string, subject: AnyClass<Subject>, subjectHook?: AnyClass<SubjectBeforeFilterHook<Subject, Request>> | SubjectBeforeFilterTuple<Subject, Request>): CustomDecorator;
