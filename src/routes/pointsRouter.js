"use strict";
exports.__esModule = true;
var express_1 = require("express");
var pointsContollers = require("../controllers/pointsContollers");
var jsonParser = express_1["default"].json();
var pointsRouter = express_1["default"].Router();
pointsRouter.get('/', pointsContollers.findPoints);
pointsRouter.get('/:taskId', pointsContollers.getPoints);
pointsRouter.post('/', jsonParser, pointsContollers.createPoint);
pointsRouter.patch('/', jsonParser, pointsContollers.updateSetOfPoints);
pointsRouter.patch('/:pointId', jsonParser, pointsContollers.updatePoint);
pointsRouter["delete"]('/:pointId', pointsContollers.deletePoint);
exports["default"] = pointsRouter;
