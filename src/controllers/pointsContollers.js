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
exports.deletePoint = exports.updateSetOfPoints = exports.updatePoint = exports.createPoint = exports.findPoints = exports.getPoints = void 0;
var pointService = require("../services/point.service");
var error_service_1 = require("../services/error.service");
var server_service_1 = require("../services/server.service");
var boardService = require("../services/board.service");
var getPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, foundedPoints, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params['taskId'];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pointService.findPoints({ taskId: taskId })];
            case 2:
                foundedPoints = _a.sent();
                res.json(foundedPoints);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPoints = getPoints;
var findPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, ids, allPoints, allPoints;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, boardService.getBordsIdsByUserId(req.query.userId)];
            case 1:
                boards = _a.sent();
                ids = req.query.ids;
                if (!ids) return [3 /*break*/, 3];
                return [4 /*yield*/, pointService.findPoints({})];
            case 2:
                allPoints = _a.sent();
                return [2 /*return*/, res.json(allPoints.filter(function (item) { return ids.includes(item._id); }))];
            case 3:
                if (!boards) return [3 /*break*/, 5];
                return [4 /*yield*/, pointService.findPoints({})];
            case 4:
                allPoints = _a.sent();
                return [2 /*return*/, res.json(allPoints.filter(function (onePoint) { return boards.includes(onePoint.boardId); }))];
            case 5: return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'Bad request'))];
        }
    });
}); };
exports.findPoints = findPoints;
var createPoint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, bodyError, _a, title, taskId, boardId, done, newPoint, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'taskId', 'boardId', 'done']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, taskId = _a.taskId, boardId = _a.boardId, done = _a.done;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pointService.createPoint({ title: title, taskId: taskId, boardId: boardId, done: done }, guid, initUser)];
            case 2:
                newPoint = _b.sent();
                res.json(newPoint);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, console.log(err_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPoint = createPoint;
var updatePoint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, bodyError, _a, title, done, updatedPoint, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'done']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, done = _a.done;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pointService.updatePoint(req.params.pointId, { title: title, done: done }, guid, initUser)];
            case 2:
                updatedPoint = _b.sent();
                res.json(updatedPoint);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, console.log(err_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePoint = updatePoint;
var updateSetOfPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, points, updatedPoints, _i, points_1, onePoint, pointError, _id, done, foundedPoints, _a, _b, err_4, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                points = req.body;
                if (points.length == 0) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'You need at least 1 point'))];
                }
                updatedPoints = [];
                _i = 0, points_1 = points;
                _g.label = 1;
            case 1:
                if (!(_i < points_1.length)) return [3 /*break*/, 7];
                onePoint = points_1[_i];
                pointError = (0, error_service_1.checkBody)(onePoint, ['_id', 'done']);
                if (pointError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, pointError))];
                }
                _id = onePoint._id, done = onePoint.done;
                return [4 /*yield*/, pointService.findPointById(_id)];
            case 2:
                foundedPoints = _g.sent();
                if (!foundedPoints) {
                    return [2 /*return*/, res.status(404).send((0, error_service_1.createError)(404, 'Point was not founded!'))];
                }
                _g.label = 3;
            case 3:
                _g.trys.push([3, 5, , 6]);
                _b = (_a = updatedPoints).push;
                return [4 /*yield*/, pointService.updatePoint(_id, { done: done }, guid, initUser, false)];
            case 4:
                _b.apply(_a, [_g.sent()]);
                return [3 /*break*/, 6];
            case 5:
                err_4 = _g.sent();
                return [2 /*return*/, console.log(err_4)];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7:
                _d = (_c = server_service_1.socket).emit;
                _e = ['points'];
                _f = {
                    action: 'update'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(updatedPoints.map(function (item) { return item.boardId; }))];
            case 8:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = updatedPoints.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/, res.json(updatedPoints)];
        }
    });
}); };
exports.updateSetOfPoints = updateSetOfPoints;
var deletePoint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, deletedPoint, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pointService.deletePointById(req.params.pointId, guid, initUser)];
            case 2:
                deletedPoint = _a.sent();
                res.json(deletedPoint);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, console.log(err_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePoint = deletePoint;
