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
exports.upload = void 0;
var multer_1 = require("multer");
var fs_1 = require("fs");
var fileService = require("../services/file.service");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, next) {
        fs_1["default"].mkdir('files/', function (err) {
            next(null, 'files/');
        });
    },
    filename: function (req, fileFromReq, next) {
        var taskId = req.body.taskId;
        var originalname = fileFromReq.originalname;
        next(null, "".concat(taskId, "-").concat(originalname));
    }
});
exports.upload = (0, multer_1["default"])({
    storage: storage,
    fileFilter: function (req, fileFromReq, next) { return __awaiter(void 0, void 0, void 0, function () {
        var taskId, boardId, name_1, path, existFile, guid, initUser, newFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(fileFromReq.mimetype == 'image/png' || fileFromReq.mimetype == 'image/jpeg')) return [3 /*break*/, 3];
                    taskId = req.body.taskId;
                    boardId = req.body.boardId;
                    name_1 = fileFromReq.originalname;
                    path = "files/".concat(taskId, "-").concat(name_1);
                    return [4 /*yield*/, fileService.findOneFile({ taskId: taskId, name: name_1 })];
                case 1:
                    existFile = _a.sent();
                    if (existFile) {
                        req.params.error = "File already exist";
                        next(null, false);
                    }
                    guid = req.header('Guid') || 'undefined';
                    initUser = req.header('initUser') || 'undefined';
                    return [4 /*yield*/, fileService.createFile({ taskId: taskId, name: name_1, path: path, boardId: boardId }, guid, initUser)];
                case 2:
                    newFile = _a.sent();
                    req.params.fileId = newFile._id;
                    next(null, true);
                    return [3 /*break*/, 4];
                case 3:
                    req.params.error = "Incorrect file extension";
                    next(null, false);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); }
});
