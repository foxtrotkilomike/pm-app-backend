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
exports.deletePointsByParams = exports.deletePointById = exports.updatePoint = exports.findPointById = exports.findPoints = exports.createSetOfPoints = exports.createPoint = void 0;
var point_1 = require("../models/point");
var mongodb_1 = require("mongodb");
var server_service_1 = require("./server.service");
var boardService = require("./board.service");
var createPoint = function (params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var newPoint, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    newPoint = new point_1["default"](params);
                    return [4 /*yield*/, newPoint.save()];
                case 1:
                    _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['points'];
                    _d = {
                        action: 'add'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([newPoint.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [newPoint._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, newPoint];
            }
        });
    });
};
exports.createPoint = createPoint;
var createSetOfPoints = function (taskId, boardId, newPoints, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var createdPoints, _i, newPoints_1, onePoint, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                if (newPoints.length === 0) {
                    return [2 /*return*/, []];
                }
                createdPoints = [];
                _i = 0, newPoints_1 = newPoints;
                _g.label = 1;
            case 1:
                if (!(_i < newPoints_1.length)) return [3 /*break*/, 4];
                onePoint = newPoints_1[_i];
                _b = (_a = createdPoints).push;
                return [4 /*yield*/, (0, exports.createPoint)(__assign(__assign({}, onePoint), { taskId: taskId, boardId: boardId }), guid, initUser, false)];
            case 2:
                _b.apply(_a, [_g.sent()]);
                _g.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                _d = (_c = server_service_1.socket).emit;
                _e = ['points'];
                _f = {
                    action: 'add'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(createdPoints.map(function (item) { return item.boardId; }))];
            case 5:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = createdPoints.map(function (item) { return item._id; }),
                        _f.guid = 'doesnt metter',
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/, createdPoints];
        }
    });
}); };
exports.createSetOfPoints = createSetOfPoints;
var findPoints = function (params) {
    return point_1["default"].find(params);
};
exports.findPoints = findPoints;
var findPointById = function (id) {
    return point_1["default"].findById(new mongodb_1.ObjectId(id));
};
exports.findPointById = findPointById;
var updatePoint = function (id, params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pointId, updatedPoint, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    pointId = new mongodb_1.ObjectId(id);
                    return [4 /*yield*/, point_1["default"].findByIdAndUpdate(pointId, params, { "new": true })];
                case 1:
                    updatedPoint = _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['points'];
                    _d = {
                        action: 'update'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([updatedPoint.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [updatedPoint._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, updatedPoint];
            }
        });
    });
};
exports.updatePoint = updatePoint;
var deletePointById = function (pointId, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, deletedPoint, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = new mongodb_1.ObjectId(pointId);
                    return [4 /*yield*/, point_1["default"].findByIdAndDelete(id)];
                case 1:
                    deletedPoint = _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['points'];
                    _d = {
                        action: 'delete'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([deletedPoint.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [deletedPoint._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, deletedPoint];
            }
        });
    });
};
exports.deletePointById = deletePointById;
var deletePointsByParams = function (params, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var points, deletedPoints, _i, points_1, onPoint, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, point_1["default"].find(params)];
            case 1:
                points = _g.sent();
                deletedPoints = [];
                _i = 0, points_1 = points;
                _g.label = 2;
            case 2:
                if (!(_i < points_1.length)) return [3 /*break*/, 5];
                onPoint = points_1[_i];
                _b = (_a = deletedPoints).push;
                return [4 /*yield*/, (0, exports.deletePointById)(onPoint._id, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = (_c = server_service_1.socket).emit;
                _e = ['points'];
                _f = {
                    action: 'delete'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(deletedPoints.map(function (item) { return item.boardId; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = deletedPoints.map(function (item) { return item._id; }),
                        _f.guid = 'doesnt metter',
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.deletePointsByParams = deletePointsByParams;
