import { Router, Request, Response, NextFunction } from 'express';
import db from '../db/dbconnection';
import { rejects } from 'assert';
import { resolve } from 'url';

interface Filters {
	// maker: string;
	// taker: string;
	// makerFee: BigNumber;
	// takerFee: BigNumber;
	// makerTokenAmount: BigNumber;
	// takerTokenAmount: BigNumber;
	// makerTokenAddress: string;
	// takerTokenAddress: string;
	// salt: BigNumber;
	// exchangeContractAddress: string;
	// feeRecipient: string;
	// expirationUnixTimestampSec: BigNumber;
}

const filters: Filters[] = [];

class Filtering {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public GetQueries(req: Request, res: Response): void {
		const filter = req.body;
		db.query(`SELECT * FROM filtering`, (err, rows, fields) => {
			if (err) {
				throw err;
			}
			console.log(rows);
			res.send("You did it bro");
		})
	}

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

	routes() {
		this.router.get('/', this.GetQueries);
		// this.router.post('/', this.PostOrder);
		// this.router.delete('/', this.RemoveOrder);
	}
}

const filteringRoutes = new Filtering();
filteringRoutes.routes();

export default filteringRoutes.router;