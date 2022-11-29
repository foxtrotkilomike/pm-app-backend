"use strict";
exports.__esModule = true;
exports.checkPassword = exports.hashPassword = void 0;
var bcrypt_1 = require("bcrypt");
var hashPassword = function (password) {
    return bcrypt_1["default"].hash(password, 12);
};
exports.hashPassword = hashPassword;
var checkPassword = function (password, hash) {
    return bcrypt_1["default"].compare(password, hash);
};
exports.checkPassword = checkPassword;
