"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var boardScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('Board', boardScheme);
