"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const person_1 = require("./person");
const construction_1 = require("./construction");
const container = new inversify_1.Container();
exports.container = container;
container.bind('Person').to(person_1.ABC);
container.bind('Construction').to(construction_1.Construction);
//# sourceMappingURL=inversify.config.js.map