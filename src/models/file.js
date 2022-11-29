"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var fileScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    boardId: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('File', fileScheme);
