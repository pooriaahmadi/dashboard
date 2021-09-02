import { Response, Request, Router, NextFunction } from "express";
import { Connection } from "mysql";

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
export interface BaseInputsInterface {
	host: string;
	port: number;
	username: string;
	password: string;
	databaseName: string;
}
export interface BaseModel {
	host: string;
	port: number;
	username: string;
	password: string;
	databaseName: string;
	db?: Connection;
	create: () => this;
	turnOn: () => Promise<any>;
	turnOff: () => any;
	pause: () => any;
	resume: () => any;
}
export interface DatabaseInputs {
	base: BaseModel;
}
export interface ResolveUpdateValuesInputs {
	values: { [key: string]: string };
	table: string;
}
export interface DatabaseModel {
	base: BaseModel;
	createQuery: (sqlQuery: string) => Promise<any>;
	resolveUpdateValues: ({ values, table }: ResolveUpdateValuesInputs) => string;
}
export interface VipInputs {
	id: number;
	start: Date;
	end: Date;
}
export interface VipModel {
	id: number;
	start: Date;
	end: Date;
	isExpired: () => boolean;
}
export interface SaveInputModels {
	id: number;
	title?: string;
	content: string;
	media: string | null;
}

export interface SaveModel {
	id: number;
	title?: string;

	content: string;
	media: string | null;
	updateMedia: (newMedia: string) => Promise<void>;
	updateContent: (newContent: string) => Promise<void>;
	updateTitle: (newTitle: string) => Promise<void>;
	delete: () => Promise<void>;
}
export interface UsersModelInput {
	discordId: string | undefined;
	username: string | undefined;
	discriminator: string | undefined;
}

export interface UsersModel {
	all: () => Promise<Array<UserModel>>;
	getById: (id: number) => Promise<UserModel | undefined>;
	getByDiscordId: (id: string | undefined) => Promise<UserModel | undefined>;
	getStaffs: () => Promise<Array<UserModel>>;
	savesCount: () => Promise<number>;
	usersCount: () => Promise<number>;
	create: ({
		discordId,
		username,
		discriminator,
	}: UserModelInputs) => Promise<UserModel>;
}

export interface UserModelInputs {
	id: number;
	discordId: string | undefined;
	username: string | undefined;
	discriminator: string | undefined;
	usedCommands: number;
	isStaff: boolean;
	vip: VipModel | null;
}
export interface DiscordInformation {
	username: string;
	discriminator: string;
}

export interface UserAddInputs {
	content: string;
	title?: string;
	media: string | null;
}

export interface UserModel {
	id: number;
	discordId: string | undefined;
	username: string | undefined;
	discriminator: string | undefined;
	usedCommands: number;
	isStaff: boolean;
	vip: VipModel | null;
	makeVip: (endDate: Date) => Promise<boolean>;
	makeNormal: () => Promise<boolean>;
	makeStaff: () => Promise<boolean>;
	demote: () => Promise<boolean>;
	updateDiscordInformation: ({
		username,
		discriminator,
	}: DiscordInformation) => Promise<boolean>;
	add: ({ content, media, title }: UserAddInputs) => Promise<SaveModel>;
	saves: () => Promise<Array<SaveModel>>;
	savesCount: () => Promise<number>;
	getSave: (id: number) => Promise<SaveModel | null>;
	addUsedCommand: (value: number) => Promise<void>;
	deleteSaves: () => Promise<void>;
}
