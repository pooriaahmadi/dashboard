const express = require("express");
class AppRoute {
	constructor({ execute, middleWares = [], customRoute, method }) {
		this.execute = execute;
		this.method = method;
		this.middleWares = middleWares;
		this.customRoute = customRoute;
	}
	getRouter = () => {
		const Router = express.Router();
		this.middleWares.forEach((item) => {
			Router.use(async (request, response, next) => {
				return await item.run({ request, response, next });
			});
		});
		switch (this.method) {
			case "GET":
				Router.get("", this.execute);
				break;
			case "PUT":
				Router.put("", this.execute);
				break;
			case "DELETE":
				Router.delete("", this.execute);
				break;
			case "POST":
				Router.post("", this.execute);
				break;
			default:
				break;
		}
		return Router;
	};
}
module.exports = AppRoute;
