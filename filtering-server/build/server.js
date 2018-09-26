"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var FilteringRouter_1 = require("./routers/FilteringRouter");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        // config
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(cors());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/filtering', FilteringRouter_1.default);
    };
    return Server;
}());
exports.default = new Server().app;
