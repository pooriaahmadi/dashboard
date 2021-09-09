const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
module.exports = new AppRoute({
	execute: async (request, response) => {
		return response.json(JSON.parse(JSON.stringify(request.user)));
	},
	method: "POST",
	middleWares: [login],
});
