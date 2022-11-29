"use strict";
exports.__esModule = true;
exports.checkBody = exports.createError = void 0;
function createError(statusCode, message) {
    return { statusCode: statusCode, message: message };
}
exports.createError = createError;
function checkBody(body, keys) {
    var bodyKeys = Object.keys(body);
    if (bodyKeys.length === 0) {
        return 'body is required';
    }
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!body.hasOwnProperty(key)) {
            return "".concat(key, " is required");
        }
    }
    if (bodyKeys.length > keys.length) {
        var extraProps = bodyKeys.filter(function (prop) { return !keys.includes(prop); });
        return "properties [ ".concat(extraProps.join(','), " ] shouldn't exist");
    }
    return null;
}
exports.checkBody = checkBody;
