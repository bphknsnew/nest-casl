import { AnyAbility, Subject } from '@casl/ability';
import { Condition } from '@ucast/mongo2js';
export declare type SqlConditions = [string, unknown[], string[]];
export declare class ConditionsProxy {
    private abilitites;
    private action;
    private subject;
    constructor(abilitites: AnyAbility, action: string, subject: Subject);
    toAst(): Condition | null;
    toSql(): SqlConditions | undefined;
    joinRelation(): boolean;
}
