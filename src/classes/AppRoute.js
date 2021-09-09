const express = require("express");
class AppRoute {
	constructor({
		execute,
		middleWares = [],
		validations = [],
		customRoute,
		method,
	}) {
		this.execute = execute;
		this.method = method;
		this.middleWares = middleWares;
		this.customRoute = customRoute;
		this.validations = validations;
	}
	getRouter = () => {
		const Router = express.Router();
		this.middleWares.forEach((item) => {
			Router.use(async (request, response, next) => {
				return await item.run({ request, response, next });
			});
		});
		const execute = async (request, response) => {
			for (let i = 0; i < this.validations.length; i++) {
				if (
					request.body.constructor === Object &&
					Object.keys(request.body).length === 0
				) {
					return response.status(400).json({
						message: "Body is required",
					});
				}
				const validate = this.validations[i];
				const { error } = validate.validate(request.body);
				if (error) {
					return response.status(400).json(error);
				}
			}
			await this.execute(request, response);
		};
		switch (this.method) {
			case "GET":
				Router.get("", execute);
				break;
			case "PUT":
				Router.put("", execute);
				break;
			case "DELETE":
				Router.delete("", execute);
				break;
			case "POST":
				Router.post("", execute);
				break;
			default:
				break;
		}
		return Router;
	};
}
module.exports = AppRoute;
