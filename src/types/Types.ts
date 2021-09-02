import { Response, Request, Router, NextFunction } from "express";

export type AppRouteTypes = "GET" | "POST" | "PUT" | "DELETE";

export interface AppInputs {
	route: string;
}
export interface AppModel {
	route: string;
	getRoutes: (name?: string) => { class: AppRouteModel; name: string }[];
}
export interface AppRouteInputs {
	execute: (request: Request, response: Response) => Promise<any>;
	middleWares?: Array<MiddlewareModel>;
	method: AppRouteTypes;
	customRoute?: string;
}
export interface AppRouteModel {
	execute: (request: Request, response: Response) => Promise<any>;
	middleWares?: Array<MiddlewareModel>;
	method: AppRouteTypes;
	customRoute?: string;
	getRouter: () => Router;
}
export interface MiddlewareExecuteInputs {
	request: Request;
	response: Response;
	next: NextFunction;
}
export interface MiddlewareInputs {
	execute: ({
		request,
		response,
		next,
	}: MiddlewareExecuteInputs) => Promise<any>;
}
export interface MiddlewareModel {
	execute: ({
		request,
		response,
		next,
	}: MiddlewareExecuteInputs) => Promise<any>;
	run: ({ request, response, next }: MiddlewareExecuteInputs) => Promise<any>;
}
