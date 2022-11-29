"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var columnScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    boardId: {
        type: String,
        required: true
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('Column', columnScheme);
