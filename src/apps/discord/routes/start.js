const AppRoute = require("../../../classes/AppRoute");
module.exports = new AppRoute({
	execute: (request, response) => {
		response.send("hi from discord");
	},
	method: "GET",
});
