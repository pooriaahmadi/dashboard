// Imports

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Express app

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
fs.readdirSync(path.join(__dirname, "apps")).forEach((dir) => {
	const application = require(path.join(__dirname, "apps", dir));
	app.use(
		`/${application.route !== undefined ? application.route : dir}`,
		application.getRouter(dir)
	);
	application.getRoutes(dir).forEach((item) => {
		console.log(
			`Loaded /${application.route !== undefined ? application.route : dir}/${
				item.class.customRoute || item.name
			}`
		);
		app.use(
			`/${application.route !== undefined ? application.route : dir}/${
				item.class.customRoute || item.name
			}`,
			item.class.getRouter()
		);
	});
});

app.listen(config.port, () => {
	console.log(`Server is running at ${config.host}:${config.port}`);
});
