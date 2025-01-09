"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mxGraphFactory = void 0;
const mxgraph_1 = __importDefault(require("mxgraph"));
//window.mxBasePath = '../node_modules/mxgraph/javascript/src';
window.mxLoadResources = false;
window.mxForceIncludes = false;
window.mxLoadStylesheets = false;
window.mxResourceExtension = '.txt';
exports.mxGraphFactory = (0, mxgraph_1.default)({});
