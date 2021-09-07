const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
module.exports = new AppRoute({
	execute: async (request, response) => {
		return response.status(200).json({});
	},
	method: "POST",
	middleWares: [login],
});
