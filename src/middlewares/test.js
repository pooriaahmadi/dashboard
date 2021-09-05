const Middleware = require("../classes/Middleware");
module.exports = new Middleware({
	execute: async ({ next, request, response }) => {
		console.log("middleware");
		next();
	},
});
