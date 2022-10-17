"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHookFactory = exports.TupleUserHook = exports.NullUserHook = void 0;
const core_1 = require("@nestjs/core");
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
async function userHookFactory(moduleRef, request, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullUserHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass);
        return new TupleUserHook(service, runFunction);
    }
    const contextId = core_1.ContextIdFactory.getByRequest(request);
    let hook;
    try {
        hook = await moduleRef.resolve(hookOrTuple, contextId);
    }
    catch (err) {
        hook = await moduleRef.create(hookOrTuple);
    }
    return hook;
}
exports.userHookFactory = userHookFactory;
//# sourceMappingURL=user-hook.factory.js.map