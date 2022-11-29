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
exports.clearUserInTasks = exports.deleteTaskByParams = exports.deleteTaskById = exports.updateTask = exports.findTasks = exports.findTaskById = exports.findOneTask = exports.createTask = void 0;
var task_1 = require("../models/task");
var mongodb_1 = require("mongodb");
var fileService = require("../services/file.service");
var pointService = require("../services/point.service");
var boardService = require("./board.service");
var server_service_1 = require("./server.service");
var createTask = function (params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var newTask, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    newTask = new task_1["default"](params);
                    return [4 /*yield*/, newTask.save()];
                case 1:
                    _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['tasks'];
                    _d = {
                        action: 'add'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([newTask.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [newTask._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, newTask];
            }
        });
    });
};
exports.createTask = createTask;
var findOneTask = function (params) {
    return task_1["default"].findOne(params);
};
exports.findOneTask = findOneTask;
var findTaskById = function (id) {
    return task_1["default"].findById(new mongodb_1.ObjectId(id));
};
exports.findTaskById = findTaskById;
var findTasks = function (params) {
    return task_1["default"].find(params);
};
exports.findTasks = findTasks;
var updateTask = function (id, params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var taskId, updatedTask, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    taskId = new mongodb_1.ObjectId(id);
                    return [4 /*yield*/, task_1["default"].findByIdAndUpdate(taskId, params, { "new": true })];
                case 1:
                    updatedTask = _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['tasks'];
                    _d = {
                        action: 'update'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([updatedTask.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [updatedTask._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, updatedTask];
            }
        });
    });
};
exports.updateTask = updateTask;
var deleteTaskById = function (taskId, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, deletedTask, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = new mongodb_1.ObjectId(taskId);
                    return [4 /*yield*/, task_1["default"].findByIdAndDelete(id)];
                case 1:
                    deletedTask = _e.sent();
                    fileService.deletedFilesByTask(taskId, guid, initUser);
                    pointService.deletePointsByParams({ taskId: taskId }, guid, initUser);
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['tasks'];
                    _d = {
                        action: 'delete'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([deletedTask.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [deletedTask._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, deletedTask];
            }
        });
    });
};
exports.deleteTaskById = deleteTaskById;
var deleteTaskByParams = function (params, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, deletedTasks, _i, tasks_1, onTask, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, task_1["default"].find(params)];
            case 1:
                tasks = _g.sent();
                deletedTasks = [];
                _i = 0, tasks_1 = tasks;
                _g.label = 2;
            case 2:
                if (!(_i < tasks_1.length)) return [3 /*break*/, 5];
                onTask = tasks_1[_i];
                _b = (_a = deletedTasks).push;
                return [4 /*yield*/, (0, exports.deleteTaskById)(onTask._id, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = (_c = server_service_1.socket).emit;
                _e = ['tasks'];
                _f = {
                    action: 'delete'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(deletedTasks.map(function (item) { return item.boardId; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = deletedTasks.map(function (item) { return item._id; }),
                        _f.guid = 'doesnt metter',
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTaskByParams = deleteTaskByParams;
var clearUserInTasks = function (userId, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, clearedTasks, _i, tasks_2, onTask, userIndex, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, task_1["default"].find({})];
            case 1:
                tasks = _g.sent();
                clearedTasks = [];
                _i = 0, tasks_2 = tasks;
                _g.label = 2;
            case 2:
                if (!(_i < tasks_2.length)) return [3 /*break*/, 5];
                onTask = tasks_2[_i];
                userIndex = onTask.users.findIndex(function (item) { return item == userId; });
                if (!(userIndex > 0)) return [3 /*break*/, 4];
                onTask.users.splice(userIndex, 1);
                _b = (_a = clearedTasks).push;
                return [4 /*yield*/, (0, exports.updateTask)(onTask._id, { users: onTask.users }, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = (_c = server_service_1.socket).emit;
                _e = ['tasks'];
                _f = {
                    action: 'update'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(clearedTasks.map(function (item) { return item.boardId; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = clearedTasks.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.clearUserInTasks = clearUserInTasks;
