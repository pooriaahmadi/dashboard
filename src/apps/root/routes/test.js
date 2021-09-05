const AppRoute = require("../../../classes/AppRoute");
module.exports = new AppRoute({
	execute: (request, response) => {
		response.send("asd");
	},
	method: "GET",
});
