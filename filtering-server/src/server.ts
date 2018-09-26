import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import FilteringRouter from './routers/FilteringRouter';

class Server {
	
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	public config() {
		// config
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(logger('dev'));
		this.app.use(cors());
	}

	public routes(): void {
		let router: express.Router;
		router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/filtering', FilteringRouter);
	}
}

export default new Server().app;