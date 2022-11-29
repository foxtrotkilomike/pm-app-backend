"use strict";
exports.__esModule = true;
var error_service_1 = require("../services/error.service");
var token_service_1 = require("../services/token.service");
var isAuth = function (req, res, next) {
    if (['/auth/signin', '/auth/signup'].includes(req.path) || req.path.substring(0, 7) == '/files/') {
        return next();
    }
    var authHeader = req.header('Authorization');
    if (authHeader) {
        var _a = authHeader.split(' '), type = _a[0], token = _a[1];
        if (type === 'Bearer' && (0, token_service_1.checkToken)(token)) {
            return next();
        }
    }
    return res.status(403).send((0, error_service_1.createError)(403, 'Invalid token'));
};
exports["default"] = isAuth;
