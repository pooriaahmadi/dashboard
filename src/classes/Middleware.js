class Middleware {
	constructor({ execute }) {
		this.execute = execute;
	}
	run = async ({ request, response, next }) => {
		return await this.execute({ request, response, next });
	};
}
module.exports = Middleware;
