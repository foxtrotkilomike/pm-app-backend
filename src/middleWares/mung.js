"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express_mung_1 = require("express-mung");
function redact(body) {
    if (!body) {
        return body;
    }
    if (Array.isArray(body)) {
        return body.map(function (item) { return redact(item); });
    }
    if (body._doc) {
        var newBody = __assign({}, body._doc);
        if (newBody.password) {
            delete newBody.password;
        }
        return newBody;
    }
    return body;
}
exports["default"] = express_mung_1["default"].json(redact);
