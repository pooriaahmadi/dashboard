import express, { NextFunction, Request, Response } from "express";
import { AppRouteInputs, AppRouteModel } from "../types/Types";
class AppRoute implements AppRouteModel {
	execute;
	middleWares?;
	customRoute?;
	method;
	constructor({ execute, middleWares, customRoute, method }: AppRouteInputs) {
		this.execute = execute;
		this.method = method;
		this.middleWares = middleWares;
		this.customRoute = customRoute;
	}
	getRouter = () => {
		const Router = express.Router();
		this.middleWares?.forEach((item) => {
			Router.use(
				async (request: Request, response: Response, next: NextFunction) => {
					return await item.run({ request, response, next });
				}
			);
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

export default AppRoute;
