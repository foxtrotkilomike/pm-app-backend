"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.chek = exports.signUp = exports.signIn = void 0;
var userService = require("../services/user.service");
var error_service_1 = require("../services/error.service");
var hash_service_1 = require("../services/hash.service");
var token_service_1 = require("../services/token.service");
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bodyError, _a, login, password, foundedUser, isCorrectPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bodyError = (0, error_service_1.checkBody)(req.body, ['login', 'password']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, login = _a.login, password = _a.password;
                return [4 /*yield*/, userService.findOneUser({ login: login })];
            case 1:
                foundedUser = _b.sent();
                if (!foundedUser) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, hash_service_1.checkPassword)(password, foundedUser.password)];
            case 2:
                isCorrectPassword = _b.sent();
                if (isCorrectPassword) {
                    return [2 /*return*/, res.send({ token: (0, token_service_1.signToken)(foundedUser._id, login) })];
                }
                _b.label = 3;
            case 3: return [2 /*return*/, res.status(401).send((0, error_service_1.createError)(401, 'Authorization error'))];
        }
    });
}); };
exports.signIn = signIn;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bodyError, _a, login, name, password, foundedUser, hashedPassword, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bodyError = (0, error_service_1.checkBody)(req.body, ['name', 'login', 'password']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, login = _a.login, name = _a.name, password = _a.password;
                return [4 /*yield*/, userService.findOneUser({ login: login })];
            case 1:
                foundedUser = _b.sent();
                if (foundedUser) {
                    return [2 /*return*/, res.status(409).send((0, error_service_1.createError)(409, 'Login already exist'))];
                }
                return [4 /*yield*/, (0, hash_service_1.hashPassword)(password)];
            case 2:
                hashedPassword = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, userService.createUser({ login: login, name: name, password: hashedPassword })];
            case 4:
                newUser = _b.sent();
                res.json(newUser);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, console.log(err_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var chek = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).send((0, error_service_1.createError)(200, 'success'))];
    });
}); };
exports.chek = chek;
