"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var userScheme = new Schema({
    name: {
        type: String,
        required: true
    }, login: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }
}, { versionKey: false });
exports["default"] = mongoose_1["default"].model('User', userScheme);
