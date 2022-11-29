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
exports.deleteColumnByParams = exports.deleteColumnById = exports.updateColumn = exports.findColumns = exports.findColumnById = exports.findOneColumn = exports.createColumn = void 0;
var column_1 = require("../models/column");
var mongodb_1 = require("mongodb");
var taskService = require("./task.service");
var boardService = require("./board.service");
var server_service_1 = require("./server.service");
var createColumn = function (params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var newColumn, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    newColumn = new column_1["default"](params);
                    return [4 /*yield*/, newColumn.save()];
                case 1:
                    _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['columns'];
                    _d = {
                        action: 'add'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([newColumn.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [newColumn._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, newColumn];
            }
        });
    });
};
exports.createColumn = createColumn;
var findOneColumn = function (params) {
    return column_1["default"].findOne(params);
};
exports.findOneColumn = findOneColumn;
var findColumnById = function (id) {
    return column_1["default"].findById(new mongodb_1.ObjectId(id));
};
exports.findColumnById = findColumnById;
var findColumns = function (params) {
    return column_1["default"].find(params);
};
exports.findColumns = findColumns;
var updateColumn = function (id, params, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var columnId, updatedColumn, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    columnId = new mongodb_1.ObjectId(id);
                    return [4 /*yield*/, column_1["default"].findByIdAndUpdate(columnId, params, { "new": true })];
                case 1:
                    updatedColumn = _e.sent();
                    if (!emit) return [3 /*break*/, 3];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['columns'];
                    _d = {
                        action: 'update'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([updatedColumn.boardId])];
                case 2:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [updatedColumn._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 3;
                case 3: return [2 /*return*/, updatedColumn];
            }
        });
    });
};
exports.updateColumn = updateColumn;
var deleteColumnById = function (columnId, guid, initUser, emit, notify) {
    if (emit === void 0) { emit = true; }
    if (notify === void 0) { notify = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, deletedColumn, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = new mongodb_1.ObjectId(columnId);
                    return [4 /*yield*/, column_1["default"].findByIdAndDelete(id)];
                case 1:
                    deletedColumn = _e.sent();
                    return [4 /*yield*/, taskService.deleteTaskByParams({ columnId: columnId }, guid, initUser)];
                case 2:
                    _e.sent();
                    if (!emit) return [3 /*break*/, 4];
                    _b = (_a = server_service_1.socket).emit;
                    _c = ['columns'];
                    _d = {
                        action: 'delete'
                    };
                    return [4 /*yield*/, boardService.getUserIdsByBoardsIds([deletedColumn.boardId])];
                case 3:
                    _b.apply(_a, _c.concat([(_d.users = _e.sent(),
                            _d.ids = [deletedColumn._id],
                            _d.guid = guid,
                            _d.notify = notify,
                            _d.initUser = initUser,
                            _d)]));
                    _e.label = 4;
                case 4: return [2 /*return*/, deletedColumn];
            }
        });
    });
};
exports.deleteColumnById = deleteColumnById;
var deleteColumnByParams = function (params, guid, initUser) { return __awaiter(void 0, void 0, void 0, function () {
    var columns, deletedColumns, _i, columns_1, onColumn, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, column_1["default"].find(params)];
            case 1:
                columns = _g.sent();
                deletedColumns = [];
                _i = 0, columns_1 = columns;
                _g.label = 2;
            case 2:
                if (!(_i < columns_1.length)) return [3 /*break*/, 5];
                onColumn = columns_1[_i];
                _b = (_a = deletedColumns).push;
                return [4 /*yield*/, (0, exports.deleteColumnById)(onColumn._id, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                _g.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = (_c = server_service_1.socket).emit;
                _e = ['columns'];
                _f = {
                    action: 'delete'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(deletedColumns.map(function (item) { return item.boardId; }))];
            case 6:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = deletedColumns.map(function (item) { return item._id; }),
                        _f.guid = 'doesnt metter',
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteColumnByParams = deleteColumnByParams;
