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
exports.deleteFile = exports.uploadFile = exports.findFiles = exports.getFilesByBoard = exports.getFile = void 0;
var error_service_1 = require("../services/error.service");
var fs_1 = require("fs");
var fileService = require("../services/file.service");
var boardService = require("../services/board.service");
var getFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        path = "files/".concat(req.params.taskId, "-").concat(req.params.fileName);
        fs_1["default"].readFile(path, function (err, file) {
            if (err) {
                return res.status(404).send((0, error_service_1.createError)(404, "file not founded"));
            }
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(file);
        });
        return [2 /*return*/];
    });
}); };
exports.getFile = getFile;
var getFilesByBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, files, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                boardId = req.params.boardId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fileService.findFiles({ boardId: boardId })];
            case 2:
                files = _a.sent();
                res.json(files);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFilesByBoard = getFilesByBoard;
var findFiles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, ids, taskId, allFiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, boardService.getBordsIdsByUserId(req.query.userId)];
            case 1:
                boards = _a.sent();
                ids = req.query.ids;
                taskId = req.query.taskId;
                return [4 /*yield*/, fileService.findFiles({})];
            case 2:
                allFiles = _a.sent();
                if (ids) {
                    return [2 /*return*/, res.json(allFiles.filter(function (item) { return ids.includes(item._id); }))];
                }
                else if (taskId) {
                    return [2 /*return*/, res.json(allFiles.filter(function (oneFile) { return oneFile.taskId == taskId; }))];
                }
                else if (boards) {
                    return [2 /*return*/, res.json(allFiles.filter(function (oneFile) { return boards.includes(oneFile.boardId); }))];
                }
                else {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, 'Bad request'))];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.findFiles = findFiles;
var uploadFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (req.params.error === "file exist") {
                    return [2 /*return*/, res.status(402).send((0, error_service_1.createError)(402, "file exist"))];
                }
                else if (req.params.error === "file not allowed") {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, "only images"))];
                }
                else if (req.params.error) {
                    return [2 /*return*/, res.status(400).send((0, error_service_1.createError)(400, req.params.error))];
                }
                _b = (_a = res).json;
                return [4 /*yield*/, fileService.getFileById(req.params.fileId)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); };
exports.uploadFile = uploadFile;
var deleteFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guid, initUser, deletedFile, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                guid = req.header('Guid') || 'undefined';
                initUser = req.header('initUser') || 'undefined';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fileService.deleteFileById(req.params.fileId, guid, initUser)];
            case 2:
                deletedFile = _a.sent();
                res.json(deletedFile);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, console.log(err_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteFile = deleteFile;
