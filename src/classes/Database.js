const mysql = require("mysql");
class Base {
	constructor({
		host = "localhost",
		port = 3306,
		username = "root",
		password = "",
		databaseName,
	}) {
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
		this.databaseName = databaseName;
		this.create();
	}
	create = () => {
		this.db = mysql.createConnection({
			host: this.host,
			port: this.port,
			user: this.username,
			password: this.password,
			database: this.databaseName,
			charset: "utf8mb4",
		});
		return this;
	};
	turnOn = () => {
		return new Promise((resolve, reject) => {
			this.db.connect((err) => {
				return err ? reject(err) : resolve("");
			});
		});
	};
	turnOff = () => {
		return this.db.destroy();
	};
	pause = () => {
		return this.db.pause();
	};
	resume = () => {
		return this.db.resume();
	};
}

class Database {
	constructor({ base }) {
		this.base = base;
	}
	createQuery = (sqlQuery) => {
		return new Promise((resolve, reject) => {
			this.base.db?.query(sqlQuery, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	};
	resolveUpdateValues = ({ values, table }) => {
		let updateQuery = `UPDATE ${table} SET `;
		const keys = Object.keys(values);
		keys.forEach((item, index) => {
			if (typeof values[item] === "string") {
				values[item] = values[item].replace(/'/g, "''");
			}
			updateQuery += `${item}='${values[item]}'`;
			if (index < keys.length - 1) {
				updateQuery += ",";
			}
		});
		return `${updateQuery} `;
	};
}

module.exports = {
	Base,
	Database,
};
