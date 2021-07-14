"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const customer = {
    name: faker_1.default.name.findName()
};
exports.default = customer;
//# sourceMappingURL=randomGenerator.js.map