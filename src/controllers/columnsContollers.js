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
exports.deleteColumn = exports.updateColumn = exports.createColumn = exports.getColumnById = exports.getColumns = void 0;
var columnService = require("../services/column.service");
var error_service_1 = require("../services/error.service");
var getColumns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, foundedColumns, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                boardId = req.baseUrl.split('/')[2];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, columnService.findColumns({ boardId: boardId })];
            case 2:
                foundedColumns = _a.sent();
                res.json(foundedColumns);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getColumns = getColumns;
var getColumnById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundedColumn, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, columnService.findColumnById(req.params['columnId'])];
            case 1:
                foundedColumn = _a.sent();
                res.json(foundedColumn);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(404).send((0, error_service_1.createError)(404, 'Column was not founded!'))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getColumnById = getColumnById;
var createColumn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, boardId, bodyError, _a, title, order, newColumn, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                boardId = req.baseUrl.split('/')[2];
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'order']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, order = _a.order;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, columnService.createColumn({ title: title, order: order, boardId: boardId }, guid, initUser)];
            case 2:
                newColumn = _b.sent();
                res.json(newColumn);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, console.log(err_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createColumn = createColumn;
var updateColumn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, bodyError, _a, title, order, updatedColumn, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'order']);
                if (bodyError) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError))];
                }
                _a = req.body, title = _a.title, order = _a.order;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, columnService.updateColumn(req.params['columnId'], { title: title, order: order }, guid, initUser)];
            case 2:
                updatedColumn = _b.sent();
                res.json(updatedColumn);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                return [2 /*return*/, console.log(err_4)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateColumn = updateColumn;
var deleteColumn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, deletedColumn, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, columnService.deleteColumnById(req.params['columnId'], guid, initUser)];
            case 2:
                deletedColumn = _a.sent();
                res.json(deletedColumn);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, console.log(err_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteColumn = deleteColumn;
