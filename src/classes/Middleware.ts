import {
	MiddlewareExecuteInputs,
	MiddlewareInputs,
	MiddlewareModel,
} from "../types/Types";
class Middleware implements MiddlewareModel {
	execute;
	constructor({ execute }: MiddlewareInputs) {
		this.execute = execute;
	}
	run = async ({ request, response, next }: MiddlewareExecuteInputs) => {
		return await this.execute({ request, response, next });
	};
}
export default Middleware;
