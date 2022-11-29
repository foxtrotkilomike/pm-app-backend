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
exports.createSetOfColumns = exports.findColumns = exports.updateSetOfColumns = void 0;
var columnService = require("../services/column.service");
var error_service_1 = require("../services/error.service");
var server_service_1 = require("../services/server.service");
var boardService = require("../services/board.service");
var updateSetOfColumns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, columns, updatedColumns, _i, columns_1, oneColumn, columnError, _id, order, foundedColumns, _a, _b, err_1, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                columns = req.body;
                if (columns.length == 0) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'You need at least 1 column'))];
                }
                updatedColumns = [];
                _i = 0, columns_1 = columns;
                _g.label = 1;
            case 1:
                if (!(_i < columns_1.length)) return [3 /*break*/, 7];
                oneColumn = columns_1[_i];
                columnError = (0, error_service_1.checkBody)(oneColumn, ['_id', 'order']);
                if (columnError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, columnError))];
                }
                _id = oneColumn._id, order = oneColumn.order;
                return [4 /*yield*/, columnService.findColumnById(_id)];
            case 2:
                foundedColumns = _g.sent();
                if (!foundedColumns) {
                    return [2 /*return*/, res.status(404).send((0, error_service_1.createError)(404, 'Column was not founded!'))];
                }
                _g.label = 3;
            case 3:
                _g.trys.push([3, 5, , 6]);
                _b = (_a = updatedColumns).push;
                return [4 /*yield*/, columnService.updateColumn(_id, { order: order }, guid, initUser, false)];
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
                _e = ['columns'];
                _f = {
                    action: 'update'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(updatedColumns.map(function (item) { return item.boardId; }))];
            case 8:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = updatedColumns.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = false,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/, res.json(updatedColumns)];
        }
    });
}); };
exports.updateSetOfColumns = updateSetOfColumns;
var findColumns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, ids, allColumns, allColumns;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, boardService.getBordsIdsByUserId(req.query.userId)];
            case 1:
                boards = _a.sent();
                ids = req.query.ids;
                if (!ids) return [3 /*break*/, 3];
                return [4 /*yield*/, columnService.findColumns({})];
            case 2:
                allColumns = _a.sent();
                return [2 /*return*/, res.json(allColumns.filter(function (item) { return ids.includes(item._id); }))];
            case 3:
                if (!boards) return [3 /*break*/, 5];
                return [4 /*yield*/, columnService.findColumns({})];
            case 4:
                allColumns = _a.sent();
                return [2 /*return*/, res.json(allColumns.filter(function (oneColumn) { return boards.includes(oneColumn.boardId); }))];
            case 5: return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'Bad request'))];
        }
    });
}); };
exports.findColumns = findColumns;
var createSetOfColumns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, columns, createdColumns, _i, columns_2, oneColumn, bodyError, title, order, boardId, _a, _b, err_2, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                columns = req.body;
                if (columns.length == 0) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'You need at least 1 column'))];
                }
                createdColumns = [];
                _i = 0, columns_2 = columns;
                _g.label = 1;
            case 1:
                if (!(_i < columns_2.length)) return [3 /*break*/, 6];
                oneColumn = columns_2[_i];
                bodyError = (0, error_service_1.checkBody)(oneColumn, ['title', 'order', 'boardId']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                title = oneColumn.title, order = oneColumn.order, boardId = oneColumn.boardId;
                _g.label = 2;
            case 2:
                _g.trys.push([2, 4, , 5]);
                _b = (_a = createdColumns).push;
                return [4 /*yield*/, columnService.createColumn({ title: title, order: order, boardId: boardId }, guid, initUser, false)];
            case 3:
                _b.apply(_a, [_g.sent()]);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _g.sent();
                return [2 /*return*/, console.log(err_2)];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                _d = (_c = server_service_1.socket).emit;
                _e = ['columns'];
                _f = {
                    action: 'add'
                };
                return [4 /*yield*/, boardService.getUserIdsByBoardsIds(createdColumns.map(function (item) { return item.boardId; }))];
            case 7:
                _d.apply(_c, _e.concat([(_f.users = _g.sent(),
                        _f.ids = createdColumns.map(function (item) { return item._id; }),
                        _f.guid = guid,
                        _f.notify = true,
                        _f.initUser = initUser,
                        _f)]));
                return [2 /*return*/, res.json(createdColumns)];
        }
    });
}); };
exports.createSetOfColumns = createSetOfColumns;
