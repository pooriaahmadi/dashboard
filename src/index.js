// Imports

const config = require("./config");
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express app

const app = express();
app.use(express.json());
fs.readdirSync(path.join(__dirname, "apps")).forEach((dir) => {
	const application = require(path.join(__dirname, "apps", dir));
	application.getRoutes(dir).forEach((item) => {
		console.log(
			`Loaded /${application.route}${item.class.customRoute || item.name}`
		);
		app.use(
			`/${application.route}${item.class.customRoute || item.name}`,
			item.class.getRouter()
		);
	});
});

app.listen(config.port, () => {
	console.log(`Server is running at ${config.host}:${config.port}`);
});
