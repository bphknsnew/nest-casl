"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHookFactory = exports.TupleUserHook = exports.NullUserHook = void 0;
const map = new Map();
class NullUserHook {
    async run() {
        return undefined;
    }
}
exports.NullUserHook = NullUserHook;
// TODO request generic params
class TupleUserHook {
    constructor(service, runFunc) {
        this.service = service;
        this.runFunc = runFunc;
    }
    async run(user) {
        return this.runFunc(this.service, user);
    }
}
exports.TupleUserHook = TupleUserHook;
async function userHookFactory(moduleRef, contextId, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullUserHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass);
        return new TupleUserHook(service, runFunction);
    }
    if (!map.has(contextId.id)) {
        map.set(contextId.id, true);
        await moduleRef.create(hookOrTuple);
    }
    return moduleRef.resolve(hookOrTuple, contextId);
}
exports.userHookFactory = userHookFactory;
//# sourceMappingURL=user-hook.factory.js.map