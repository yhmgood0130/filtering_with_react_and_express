import { Router, Request, Response, NextFunction } from 'express';
import db from '../db/dbconnection';
// import { rejects } from 'assert';
// import { resolve } from 'url';

interface Filters {
	id: string;
	user_email: string;
	user_first_name: string;
	user_last_name: string;
	screen_width: number; 
	screen_height: number;
	visits: number;
	page_response: number;
	domain: string;
	path: string;
}

const filters: Filters[] = [];

class Filtering {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public GetFilterTypes(req: Request, res: Response):void {
		db.query('SELECT * from session_type', (err, rows, fields) => {
			if (err) {
				throw err;
			}
			res.send(rows);
		});
	}

	public PostQueries(req: Request, res: Response): void {
		const filters = req.body;
		let filterList = "WHERE";
		filters.queries.map((filter,index) => {
			switch(filter.query) {
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
				defalut:
					break;
			}

			switch(filter.string) {
				case "starts_with":
					filterList += ` LIKE "${filter.value}%"  `;
					break;
				case "not_start_with":
					filterList += ` NOT LIKE "${filter.value}%"  `;
					break;
				case "equals":
					filterList += ` = "${filter.value}" `;
					break;
				case "not_equal":
					filterList += ` != "${filter.value}"  `;
					break;
				case "contains":
					filterList += ` LIKE "%${filter.value}%"  `;
					break;
				case "not_contain":
					filterList += ` LIKE "%${filter.value}%"  `;
					break;
				case "in_list":
					filterList += ` IN "${filter.value}"  `;
					break;
				case "not_in_list":
					filterList += ` NOT IN "${filter.value}"  `;
					break;
				default:
					break;
			}

			switch(filter.number) {
				case "range":
					filterList += ` > ${filter.min} AND ${filter.query} < ${filter.max}  `;
					break;
				case "less_equal":
					filterList += ` <= ${filter.value} `;
					break;
				case "equals":
					filterList += ` = ${filter.value} `;
					break;
				case "not_equal":
					filterList += ` != ${filter.value} `;
					break;
				case "greater_equal":
					filterList += ` <= ${filter.value} `;
					break;
				case "not_contain":
					filterList += ` LIKE "%${filter.value}%"`;
					break;
				default:
					break;
			}

			if (filters.queries.length > index + 1) {
				filterList += " AND ";
			}
		})

		let query = `SELECT * FROM session ${filterList}`;
		console.log(query, filters);
		
		
		db.query(query, (err, rows, fields) => {
			if (err) {
				throw err;
			}

			console.log(query);			

			console.log(JSON.stringify(rows));
			res.send(rows);
		})
	}

	routes() {
		this.router.post('/filters', this.PostQueries);
		this.router.get('/filters', this.GetFilterTypes);
	}
}

const filteringRoutes = new Filtering();
filteringRoutes.routes();

export default filteringRoutes.router;