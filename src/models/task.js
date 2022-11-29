"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var taskScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    boardId: {
        type: String,
        required: true
    },
    columnId: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        "default": []
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('Task', taskScheme);
