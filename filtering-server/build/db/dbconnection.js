"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    // host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'session'
});
connection.connect(function (err) {
    if (err) {
        console.log('Error', err);
    }
    else {
        console.log("Connected");
    }
});
exports.default = connection;
