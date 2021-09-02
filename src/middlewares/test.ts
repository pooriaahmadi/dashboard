import Middleware from "../classes/Middleware";
export default new Middleware({
	execute: async ({ next, request, response }) => {
		console.log("middleware");
		next();
	},
});
