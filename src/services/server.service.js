"use strict";
exports.__esModule = true;
exports.socket = exports.server = exports.app = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var isAuth_1 = require("../middleWares/isAuth");
var mung_1 = require("../middleWares/mung");
var authRouter_1 = require("../routes/authRouter");
var boardsRouter_1 = require("../routes/boardsRouter");
var filesRouter_1 = require("../routes/filesRouter");
var tasksSetRouter_1 = require("../routes/tasksSetRouter");
var usersRouter_1 = require("../routes/usersRouter");
var boardsSetRouter_1 = require("../routes/boardsSetRouter");
var columnsSetRouter_1 = require("../routes/columnsSetRouter");
var pointsRouter_1 = require("../routes/pointsRouter");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_json_1 = require("../../swagger.json");
exports.app = (0, express_1["default"])();
exports.server = http_1["default"].createServer(exports.app);
exports.socket = new socket_io_1.Server(exports.server, {
    cors: {
        origin: '*'
    }
});
exports.app.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_json_1["default"]));
exports.app.use((0, cors_1["default"])({ origin: '*' }));
exports.app.use(mung_1["default"]);
exports.app.use(isAuth_1["default"]);
exports.app.use('/users', usersRouter_1["default"]);
exports.app.use('/auth', authRouter_1["default"]);
exports.app.use('/boards', boardsRouter_1["default"]);
exports.app.use('/boardsSet', boardsSetRouter_1["default"]);
exports.app.use('/columnsSet', columnsSetRouter_1["default"]);
exports.app.use('/tasksSet', tasksSetRouter_1["default"]);
exports.app.use('/file', filesRouter_1["default"]);
exports.app.use('/points', pointsRouter_1["default"]);
exports.app.use('/files', express_1["default"].static('files'));
