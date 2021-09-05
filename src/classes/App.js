const fs = require("fs");
const path = require("path");
const express = require("express");
const removeExtension = (str) => {
	return str.replace(".ts", "").replace(".js", "");
};
class App {
	route;
	constructor({ route }) {
		this.route = route;
	}
	getRoutes = (name) => {
		return fs
			.readdirSync(path.join(__dirname, "..", "apps", name, "routes"))
			.map((item) => {
				return {
					name: removeExtension(item),
					class: require(path.join(
						__dirname,
						"..",
						"apps",
						name,
						"routes",
						item
					)),
				};
			});
	};
	getRouter = (name) => {
		const router = express.Router();
		const appRoutes = this.getRoutes(name);
		router.get("", (request, response) => {
			return response.json(
				appRoutes.map((item, index) => {
					return {
						id: index,
						route: item.name || item.class.customRoute,
					};
				})
			);
		});
		return router;
	};
}
module.exports = App;
