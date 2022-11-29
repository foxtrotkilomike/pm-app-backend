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
exports.getTasksByBoard = exports.findTasks = exports.updateSetOfTask = void 0;
var mongodb_1 = require("mongodb");
var taskService = require("../services/task.service");
var userService = require("../services/user.service");
var boardService = require("../services/board.service");
var error_service_1 = require("../services/error.service");
var server_service_1 = require("../services/server.service");
var updateSetOfTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, tasks, updatedTasks, _i, tasks_1, oneTask, taskError, _id, order, columnId, foundedTasks, _a, _b, err_1, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                tasks = req.body;
                if (tasks.length == 0) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'You need at least 1 task'))];
                }
                updatedTasks = [];
                _i = 0, tasks_1 = tasks;
                _g.label = 1;
            case 1:
                if (!(_i < tasks_1.length)) return [3 /*break*/, 7];
                oneTask = tasks_1[_i];
                taskError = (0, error_service_1.checkBody)(oneTask, ['_id', 'order', 'columnId']);
                if (taskError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + taskError))];
                }
                _id = oneTask._id, order = oneTask.order, columnId = oneTask.columnId;
                return [4 /*yield*/, taskService.findTaskById(_id)];
            case 2:
                foundedTasks = _g.sent();
                if (!foundedTasks) {
                    return [2 /*return*/, res.status(404).send((0, error_service_1.createError)(404, 'Task was not founded!'))];
                }
                _g.label = 3;
            case 3:
                _g.trys.push([3, 5, , 6]);
                _b = (_a = updatedTasks).push;
                return [4 /*yield*/, taskService.updateTask(_id, { order: order, columnId: columnId }, guid, initUser, false)];
            case 4:
                _b.apply(_a, [_g.sent()]);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _g.sent();
                return [2 /*return*/, console.log(err_1)];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7:
                _d = (_c = server_service_1.socket).emit;
                _e = ['tasks'];
                _f = {
                    action: 'update'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(updatedTasks.map(function (item) { return item.boardId; }))];
            case 8:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = updatedTasks.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/, res.json(updatedTasks)];
        }
    });
}); };
exports.updateSetOfTask = updateSetOfTask;
var findTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, boards, allTasks, ids, allUsers_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.query.search;
                return [4 /*yield*/, boardService.getBordsIdsByUserId(req.query.userId)];
            case 1:
                boards = _a.sent();
                return [4 /*yield*/, taskService.findTasks({})];
            case 2:
                allTasks = _a.sent();
                ids = req.query.ids;
                if (!ids) return [3 /*break*/, 3];
                return [2 /*return*/, res.json(allTasks.filter(function (item) { return ids.includes(item._id); }))];
            case 3:
                if (!search) return [3 /*break*/, 8];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, userService.findUsers()];
            case 5:
                allUsers_1 = _a.sent();
                return [2 /*return*/, res.json(allTasks.filter(function (oneTask) {
                        var searchRequest = search.toUpperCase();
                        if (oneTask.title.toUpperCase().includes(searchRequest)) {
                            return true;
                        }
                        if (oneTask.description.toUpperCase().includes(searchRequest)) {
                            return true;
                        }
                        var users = __spreadArray([], allUsers_1.filter(function (user) { return user._id === new mongodb_1.ObjectId(oneTask.userId) || oneTask.users.includes(user._id); }), true);
                        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                            var user = users_1[_i];
                            if (user.name.toUpperCase().includes(searchRequest)) {
                                return true;
                            }
                        }
                        return false;
                    }))];
            case 6:
                err_2 = _a.sent();
                return [2 /*return*/, console.log(err_2)];
            case 7: return [3 /*break*/, 9];
            case 8:
                if (boards) {
                    return [2 /*return*/, res.json(allTasks.filter(function (oneTask) { return boards.includes(oneTask.boardId); }))];
                }
                else {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'Bad request'))];
                }
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.findTasks = findTasks;
var getTasksByBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, foundedTasks, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                boardId = req.params.boardId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, taskService.findTasks({ boardId: boardId })];
            case 2:
                foundedTasks = _a.sent();
                res.json(foundedTasks);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTasksByBoard = getTasksByBoard;
