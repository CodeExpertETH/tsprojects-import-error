"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.loud = void 0;
var loud = function (msg) { return msg.toUpperCase(); };
exports.loud = loud;
var assert = function (a1, a2) {
    if (a1 !== a2)
        throw new Error('Assertion failed');
};
exports.assert = assert;
