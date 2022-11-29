"use strict";
exports.__esModule = true;
var express_1 = require("express");
var boardsSetContollers = require("../controllers/boardsSetContollers");
var boardsSetRouter = express_1["default"].Router();
boardsSetRouter.get('/', boardsSetContollers.getBoardsByIds);
boardsSetRouter.get('/:userId', boardsSetContollers.getBoardsByUser);
exports["default"] = boardsSetRouter;
