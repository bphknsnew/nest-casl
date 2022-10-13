"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionsProxy = void 0;
const extra_1 = require("@casl/ability/extra");
const sql_1 = require("@ucast/sql");
class ConditionsProxy {
    constructor(abilitites, action, subject) {
        this.abilitites = abilitites;
        this.action = action;
        this.subject = subject;
    }
    toAst() {
        return (0, extra_1.rulesToAST)(this.abilitites, this.action, this.subject);
    }
    toSql() {
        const ast = this.toAst();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (ast === null || !Array.from(ast.value).length)
            return undefined;
        const interpret = (0, sql_1.createSqlInterpreter)(sql_1.allInterpreters);
        return interpret(ast, {
            ...sql_1.pg,
            joinRelation: this.joinRelation,
        });
    }
    joinRelation() {
        return false;
    }
}
exports.ConditionsProxy = ConditionsProxy;
//# sourceMappingURL=conditions.proxy.js.map