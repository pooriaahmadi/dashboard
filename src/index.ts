// Imports

import { AppModel } from "./types/Types";
import config from "./config";
import express from "express";
import fs from "fs";
import path from "path";

// Express app

const app = express();
fs.readdirSync(path.join(__dirname, "apps")).forEach((dir: string) => {
	const application: AppModel = require(path.join(
		__dirname,
		"apps",
		dir
	)).default;
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
