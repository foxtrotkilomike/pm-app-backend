"use strict";
exports.__esModule = true;
exports.checkToken = exports.signToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var constants_1 = require("../constants");
var signToken = function (id, login) {
    return jsonwebtoken_1["default"].sign({ id: id, login: login }, constants_1.SECRET_KEY, { expiresIn: '720m' });
};
exports.signToken = signToken;
var checkToken = function (token) {
    try {
        jsonwebtoken_1["default"].verify(token, constants_1.SECRET_KEY);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.checkToken = checkToken;
