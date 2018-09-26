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
    Filtering.prototype.GetQueries = function (req, res) {
        var filter = req.body;
        dbconnection_1.default.query("SELECT * FROM filtering", function (err, rows, fields) {
            if (err) {
                throw err;
            }
            console.log(rows);
            res.send("You did it bro");
        });
    };
    // public PostOrder(req: Request, res: Response): void {
    // 	const filters = req.body;
    // 	filters.push(filters);
    // 	let convert = Object.values(filters).join(`","`);
    // 	convert = `"` + convert + `"`;
    // 	res.status(201).send(filters);
    // 	db.query(`INSERT INTO orders (exchangeContractAddress,maker, taker, makerTokenAddress, takerTokenAddress, feeRecipient, makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationUnixTimestampSec, salt, rate, invRate, orderHash, ecSignatureV, ecSignatureR, ecSignatureS) VALUES (${convert})`,  (err, rows, fields) => {
    // 		const message = {
    // 				type: 'update',
    // 				channel: 'orderbook',
    // 				requestId: 1,
    // 				payload: filters
    // 		};
    // 	});
    // }
    // public RemoveOrder(req: Request, res: Response): void {
    // 	const request = req.body;
    // 	db.query(`DELETE FROM orders WHERE ID = ? and orderHash = ?`, [request.ID, request.orderHash] , (err, rows, fields) => {
    // 		res.status(200).send('Order was removed successfully!')
    // 	});
    // }
    Filtering.prototype.routes = function () {
        this.router.get('/', this.GetQueries);
        // this.router.post('/', this.PostOrder);
        // this.router.delete('/', this.RemoveOrder);
    };
    return Filtering;
}());
var filteringRoutes = new Filtering();
filteringRoutes.routes();
exports.default = filteringRoutes.router;
