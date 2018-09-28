"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dbconnection_1 = require("../db/dbconnection");
var filters = [];
var Filtering = /** @class */ (function () {
    function Filtering() {
        this.router = express_1.Router();
        this.routes();
    }
    Filtering.prototype.GetFilterTypes = function (req, res) {
        dbconnection_1.default.query('SELECT * from session_type', function (err, rows, fields) {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    };
    Filtering.prototype.PostQueries = function (req, res) {
        var filters = req.body;
        var filterList = "WHERE";
        filters.queries.map(function (filter, index) {
            switch (filter.query) {
                case "id":
                    filterList += " id ";
                    break;
                case "user_email":
                    filterList += " user_email ";
                    break;
                case "user_first_name":
                    filterList += " user_first_name ";
                    break;
                case "user_last_name":
                    filterList += " user_last_name ";
                    break;
                case "screen_width":
                    filterList += " screen_width ";
                    break;
                case "screen_height":
                    filterList += " screen_height ";
                    break;
                case "visits":
                    filterList += " visits ";
                    break;
                case "page_response":
                    filterList += " page_response ";
                    break;
                case "domain":
                    filterList += " domain ";
                    break;
                case "path":
                    filterList += " path ";
                    break;
            }
            console.log(filterList);
            switch (filter.string) {
                case "starts with":
                    filterList += " LIKE \"" + filter.value + "%\"  ";
                    break;
                case "not start with":
                    filterList += " NOT LIKE \"" + filter.value + "%\"  ";
                    break;
                case "equals":
                    filterList += " = \"" + filter.value + "\" ";
                    break;
                case "not equal":
                    filterList += " != \"" + filter.value + "\"  ";
                    break;
                case "contains":
                    filterList += " LIKE \"%" + filter.value + "%\"  ";
                    break;
                case "not contain":
                    filterList += " LIKE \"%" + filter.value + "%\"  ";
                    break;
                case "in list":
                    filterList += " IN \"" + filter.value + "\"  ";
                    break;
                case "not in list":
                    filterList += " NOT IN \"" + filter.value + "\"  ";
                    break;
                default:
                    break;
            }
            switch (filter.number) {
                case "range":
                    filterList += " > " + filter.min + " AND " + filter.query + " < " + filter.max + "  ";
                    break;
                case "less equal":
                    filterList += " <= " + filter.value + " ";
                    break;
                case "equals":
                    filterList += " = " + filter.value + " ";
                    break;
                case "not equal":
                    filterList += " != " + filter.value + " ";
                    break;
                case "greater equal":
                    filterList += " <= " + filter.value + " ";
                    break;
                case "not contain":
                    filterList += " LIKE \"%" + filter.value + "%\"";
                    break;
                default:
                    break;
            }
            if (filters.queries.length > index + 1) {
                filterList += " AND ";
            }
        });
        dbconnection_1.default.query('SELECT * FROM session ' + filterList, function (err, rows, fields) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(rows));
            res.send(rows);
        });
    };
    Filtering.prototype.routes = function () {
        this.router.post('/filters', this.PostQueries);
        this.router.get('/filters', this.GetFilterTypes);
    };
    return Filtering;
}());
var filteringRoutes = new Filtering();
filteringRoutes.routes();
exports.default = filteringRoutes.router;
