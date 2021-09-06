const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
module.exports = new AppRoute({
	execute: async (request, response) => {
		const saves = await request.user.saves();
		console.log(saves);
	},
	method: "GET",
	middleWares: [login],
});
