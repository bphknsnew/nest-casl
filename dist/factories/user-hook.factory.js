"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHookFactory = exports.TupleUserHook = exports.NullUserHook = void 0;
const core_1 = require("@nestjs/core");
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
async function userHookFactory(moduleRef, request, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullUserHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass);
        return new TupleUserHook(service, runFunction);
    }
    const tenantHeader = request.headers['x-tenant-id'];
    if (!map.has(tenantHeader)) {
        map.set(tenantHeader, core_1.ContextIdFactory.getByRequest(request));
        await moduleRef.create(hookOrTuple);
    }
    const contextId = map.get(tenantHeader);
    return await moduleRef.resolve(hookOrTuple, contextId);
}
exports.userHookFactory = userHookFactory;
//# sourceMappingURL=user-hook.factory.js.map