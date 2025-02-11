"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = exports.AccessGuard = exports.SubjectProxy = exports.UserProxy = exports.ConditionsProxy = exports.DefaultActions = exports.Actions = exports.UseAbility = exports.CaslUser = exports.CaslSubject = exports.CaslConditions = exports.CaslModule = void 0;
var casl_module_1 = require("./casl.module");
Object.defineProperty(exports, "CaslModule", { enumerable: true, get: function () { return casl_module_1.CaslModule; } });
var decorators_1 = require("./decorators");
Object.defineProperty(exports, "CaslConditions", { enumerable: true, get: function () { return decorators_1.CaslConditions; } });
Object.defineProperty(exports, "CaslSubject", { enumerable: true, get: function () { return decorators_1.CaslSubject; } });
Object.defineProperty(exports, "CaslUser", { enumerable: true, get: function () { return decorators_1.CaslUser; } });
Object.defineProperty(exports, "UseAbility", { enumerable: true, get: function () { return decorators_1.UseAbility; } });
var actions_enum_1 = require("./actions.enum");
Object.defineProperty(exports, "Actions", { enumerable: true, get: function () { return actions_enum_1.Actions; } });
Object.defineProperty(exports, "DefaultActions", { enumerable: true, get: function () { return actions_enum_1.DefaultActions; } });
var conditions_proxy_1 = require("./proxies/conditions.proxy");
Object.defineProperty(exports, "ConditionsProxy", { enumerable: true, get: function () { return conditions_proxy_1.ConditionsProxy; } });
var user_proxy_1 = require("./proxies/user.proxy");
Object.defineProperty(exports, "UserProxy", { enumerable: true, get: function () { return user_proxy_1.UserProxy; } });
var subject_proxy_1 = require("./proxies/subject.proxy");
Object.defineProperty(exports, "SubjectProxy", { enumerable: true, get: function () { return subject_proxy_1.SubjectProxy; } });
var access_guard_1 = require("./access.guard");
Object.defineProperty(exports, "AccessGuard", { enumerable: true, get: function () { return access_guard_1.AccessGuard; } });
var access_service_1 = require("./access.service");
Object.defineProperty(exports, "AccessService", { enumerable: true, get: function () { return access_service_1.AccessService; } });
//# sourceMappingURL=index.js.map