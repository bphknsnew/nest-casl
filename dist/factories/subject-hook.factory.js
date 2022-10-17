"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectHookFactory = exports.TupleSubjectHook = exports.NullSubjectHook = void 0;
const core_1 = require("@nestjs/core");
const map = new Map();
class NullSubjectHook {
    async run() {
        return undefined;
    }
}
exports.NullSubjectHook = NullSubjectHook;
// TODO request generic params
class TupleSubjectHook {
    constructor(service, runFunc) {
        this.service = service;
        this.runFunc = runFunc;
    }
    async run(request) {
        return this.runFunc(this.service, request);
    }
}
exports.TupleSubjectHook = TupleSubjectHook;
async function subjectHookFactory(moduleRef, request, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullSubjectHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass, { strict: false });
        return new TupleSubjectHook(service, runFunction);
    }
    const tenantHeader = request.headers['x-tenant-id'];
    if (!map.has(tenantHeader)) {
        map.set(tenantHeader, core_1.ContextIdFactory.getByRequest(request));
        await moduleRef.create(hookOrTuple);
    }
    const contextId = map.get(tenantHeader);
    return moduleRef.resolve(hookOrTuple, contextId);
}
exports.subjectHookFactory = subjectHookFactory;
//# sourceMappingURL=subject-hook.factory.js.map