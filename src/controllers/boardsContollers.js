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
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoardById = exports.getBoards = void 0;
var boardService = require("../services/board.service");
var error_service_1 = require("../services/error.service");
var getBoards = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundedBoards, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardService.findBoards()];
            case 1:
                foundedBoards = _a.sent();
                res.json(foundedBoards);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBoards = getBoards;
var getBoardById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundedBoards, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, boardService.findBoardById(req.params['boardId'])];
            case 1:
                foundedBoards = _a.sent();
                res.json(foundedBoards);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(404).send((0, error_service_1.createError)(404, 'Board was not founded!'))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBoardById = getBoardById;
var createBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, bodyError, _a, title, owner, users, newBoard, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'owner', 'users']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, owner = _a.owner, users = _a.users;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, boardService.createBoard({ title: title, owner: owner, users: users }, guid, initUser)];
            case 2:
                newBoard = _b.sent();
                res.json(newBoard);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, console.log(err_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBoard = createBoard;
var updateBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, bodyError, _a, title, owner, users, updatedBoard, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'owner', 'users']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, owner = _a.owner, users = _a.users;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, boardService.updateBoard(req.params['boardId'], { title: title, owner: owner, users: users }, guid, initUser)];
            case 2:
                updatedBoard = _b.sent();
                res.json(updatedBoard);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                return [2 /*return*/, console.log(err_4)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBoard = updateBoard;
var deleteBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, deletedBoard, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, boardService.deleteBoardById(req.params['boardId'], guid, initUser)];
            case 2:
                deletedBoard = _a.sent();
                res.json(deletedBoard);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, console.log(err_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteBoard = deleteBoard;
