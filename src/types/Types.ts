import { Response, Request, Router } from "express";

export interface ExecuteInputs {
	request: Request;
	response: Response;
}

export interface AppInputs {
	route: string;
}
export interface AppModel {
	route: string;
	getRoutes: (name: string) => { class: AppRouteModel; name: string }[];
}
export interface AppRouteInputs {
	execute: ({ request, response }: ExecuteInputs) => Promise<any>;
	middleWares?: Array<any>;
	method: string;
	customRoute?: string;
}
export interface AppRouteModel {
	execute: ({ request, response }: ExecuteInputs) => Promise<any>;
	middleWares?: Array<any>;
	method: string;
	customRoute?: string;
	getRouter: () => Router;
}
