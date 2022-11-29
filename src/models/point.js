"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var pointScheme = new Schema({
    title: {
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
    done: {
        type: Boolean,
        required: true
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('Point', pointScheme);
