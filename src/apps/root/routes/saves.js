const AppRoute = require("../../../classes/AppRoute");
const Users = require("../../../databases/Users");
export default new AppRoute({
	execute: async (request, response) => {
		const count = await Users.savesCount();
		response.send(String(count));
	},
	method: "GET",
});
