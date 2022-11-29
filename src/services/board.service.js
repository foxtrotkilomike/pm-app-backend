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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getBordsIdsByUserId = exports.getUserIdsByBoardsIds = exports.clearUserInBoards = exports.deleteBoardByParams = exports.deleteBoardById = exports.updateBoard = exports.findBoardsByUser = exports.findBoards = exports.findBoardById = exports.createBoard = void 0;
var board_1 = require("../models/board");
var mongodb_1 = require("mongodb");
var columnService = require("./column.service");
var server_service_1 = require("./server.service");
var createBoard = function (params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var newBoard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newBoard = new board_1["default"](params);
                    return [4 /*yield*/, newBoard.save()];
                case 1:
                    _a.sent();
                    if (emit) {
                        server_service_1.socket.emit('boards', {
                            action: 'add',
                            users: __spreadArray([params.owner], params.users, true),
                            ids: [newBoard._id],
                            guid: guid,
                            notify: notify,
                            initUser: initUser
                        });
                    }
                    return [2 /*return*/, newBoard];
            }
        });
    });
};
exports.createBoard = createBoard;
var findBoardById = function (id) {
    return board_1["default"].findById(new mongodb_1.ObjectId(id));
};
exports.findBoardById = findBoardById;
var findBoards = function () {
    return board_1["default"].find({});
};
exports.findBoards = findBoards;
var findBoardsByUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var allBoards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, board_1["default"].find({})];
            case 1:
                allBoards = _a.sent();
                return [2 /*return*/, allBoards.filter(function (item) { return item.owner === userId || item.users.includes(userId); })];
        }
    });
}); };
exports.findBoardsByUser = findBoardsByUser;
var updateBoard = function (id, params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var boardId, oldVersion, deletedUsers, updatedBoard, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    boardId = new mongodb_1.ObjectId(id);
                    return [4 /*yield*/, (0, exports.findBoardById)(id)];
                case 1:
                    oldVersion = _e.sent();
                    deletedUsers = oldVersion.users.filter(function (user) { return !params.users.includes(user); });
                    return [4 /*yield*/, board_1["default"].findByIdAndUpdate(boardId, params, { "new": true })];
                case 2:
                    updatedBoard = _e.sent();
                    if (!emit) return [3 /*break*/, 4];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['boards'];
                    _d = {
                        action: 'update'
                    };
                    return [4 /*yield*/, (0, exports.getUserIdsByBoardsIds)([updatedBoard._id])];
                case 3:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [updatedBoard._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 4;
                case 4:
                    if (deletedUsers.length > 0) {
                        server_service_1.socket.emit('boards', {
                            action: 'delete',
                            users: deletedUsers,
                            ids: [updatedBoard._id],
                            guid: guid,
                            notify: notify,
                            initUser: initUser
                        });
                    }
                    return [2 /*return*/, updatedBoard];
            }
        });
    });
};
exports.updateBoard = updateBoard;
var deleteBoardById = function (boardId, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, deletedBoard, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = new mongodb_1.ObjectId(boardId);
                    return [4 /*yield*/, board_1["default"].findByIdAndDelete(id)];
                case 1:
                    deletedBoard = _a.sent();
                    users = __spreadArray(__spreadArray([], deletedBoard.users, true), [deletedBoard.owner], false);
                    return [4 /*yield*/, columnService.deleteColumnByParams({ boardId: boardId }, guid, initUser)];
                case 2:
                    _a.sent();
                    if (emit) {
                        server_service_1.socket.emit('boards', {
                            action: 'delete',
                            users: users,
                            ids: [deletedBoard._id],
                            guid: guid,
                            notify: notify,
                            initUser: initUser
                        });
                    }
                    return [2 /*return*/, deletedBoard];
            }
        });
    });
};
exports.deleteBoardById = deleteBoardById;
var deleteBoardByParams = function (params, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, deletedBoards, _i, boards_1, onBoard, _a, _b, users, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, board_1["default"].find(params)];
            case 1:
                boards = _g.sent();
                deletedBoards = [];
                _i = 0, boards_1 = boards;
                _g.label = 2;
            case 2:
                if (!(_i < boards_1.length)) return [3 /*break*/, 5];
                onBoard = boards_1[_i];
                _b = (_a = deletedBoards).push;
                return [4 /*yield*/, (0, exports.deleteBoardById)(onBoard._id, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                users = [];
                deletedBoards.forEach(function (board) { return users = __spreadArray(__spreadArray(__spreadArray([], users, true), board.users, true), [board.owner], false); });
                _d = (_c = server_service_1.socket).emit;
                _e = ['boards'];
                _f = {
                    action: 'delete'
                };
                return [4 /*yield*/, (0, exports.getUserIdsByBoardsIds)(deletedBoards.map(function (item) { return item._id; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = deletedBoards.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = true,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBoardByParams = deleteBoardByParams;
var clearUserInBoards = function (userId, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, clearedBoards, _i, boards_2, onBoard, userIndex, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, board_1["default"].find({})];
            case 1:
                boards = _g.sent();
                clearedBoards = [];
                _i = 0, boards_2 = boards;
                _g.label = 2;
            case 2:
                if (!(_i < boards_2.length)) return [3 /*break*/, 5];
                onBoard = boards_2[_i];
                userIndex = onBoard.users.findIndex(function (item) { return item == userId; });
                if (!(userIndex > 0)) return [3 /*break*/, 4];
                onBoard.users.splice(userIndex, 1);
                _b = (_a = clearedBoards).push;
                return [4 /*yield*/, (0, exports.updateBoard)(onBoard._id, { users: onBoard.users }, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = (_c = server_service_1.socket).emit;
                _e = ['boards'];
                _f = {
                    action: 'update'
                };
                return [4 /*yield*/, (0, exports.getUserIdsByBoardsIds)(clearedBoards.map(function (item) { return item._id; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = clearedBoards.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.clearUserInBoards = clearUserInBoards;
var getUserIdsByBoardsIds = function (boards) { return __awaiter(void 0, void 0, void 0, function () {
    var allboards, interestedBoards, result, _i, interestedBoards_1, oneBoard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, board_1["default"].find({})];
            case 1:
                allboards = _a.sent();
                interestedBoards = allboards.filter(function (item) { return boards.includes(item._id.toString()); });
                result = [];
                for (_i = 0, interestedBoards_1 = interestedBoards; _i < interestedBoards_1.length; _i++) {
                    oneBoard = interestedBoards_1[_i];
                    result = __spreadArray(__spreadArray(__spreadArray([], result, true), oneBoard.users, true), [oneBoard.owner], false);
                }
                return [2 /*return*/, Array.from(new Set(result))];
        }
    });
}); };
exports.getUserIdsByBoardsIds = getUserIdsByBoardsIds;
var getBordsIdsByUserId = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var allboards, interestedBoards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, board_1["default"].find({})];
            case 1:
                allboards = _a.sent();
                interestedBoards = allboards.filter(function (item) { return item._doc.users.includes(user) || item._doc.owner === user; });
                return [2 /*return*/, interestedBoards.map(function (board) { return board._id.toString(); })];
        }
    });
}); };
exports.getBordsIdsByUserId = getBordsIdsByUserId;
