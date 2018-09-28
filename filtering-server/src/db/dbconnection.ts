import * as mysql from 'mysql';

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'session'
});

connection.connect(function(err) {
	if(err) {
		console.log('Error', err);
	} else {
		console.log("Connected");				
	}
});

export default connection;