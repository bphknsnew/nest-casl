"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProxy = void 0;
const common_1 = require("@nestjs/common");
class ContextProxy {
    constructor(context) {
        this.context = context;
    }
    static create(context) {
        return new ContextProxy(context);
    }
    async getRequest() {
        switch (this.context.getType()) {
            case 'http':
            case 'ws':
                return this.context.switchToHttp().getRequest();
            case 'graphql': {
                const { GqlExecutionContext } = await Promise.resolve().then(() => __importStar(require('@nestjs/graphql')));
                const ctx = GqlExecutionContext.create(this.context);
                const request = ctx.getContext().req;
                request.params = {
                    ...ctx.getArgs(),
                    ...request.params,
                };
                return request;
            }
            default:
                throw new common_1.NotAcceptableException();
        }
    }
}
exports.ContextProxy = ContextProxy;
//# sourceMappingURL=context.proxy.js.map