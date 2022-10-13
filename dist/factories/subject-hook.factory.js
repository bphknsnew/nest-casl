"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectHookFactory = exports.TupleSubjectHook = exports.NullSubjectHook = void 0;
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
async function subjectHookFactory(moduleRef, contextId, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullSubjectHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass, { strict: false });
        return new TupleSubjectHook(service, runFunction);
    }
    if (!map.has(contextId.id)) {
        map.set(contextId.id, true);
        await moduleRef.create(hookOrTuple);
    }
    return moduleRef.resolve(hookOrTuple, contextId);
}
exports.subjectHookFactory = subjectHookFactory;
//# sourceMappingURL=subject-hook.factory.js.map