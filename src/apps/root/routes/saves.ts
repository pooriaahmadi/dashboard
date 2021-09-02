import AppRoute from "../../../classes/AppRoute";
import Users from "../../../databases/Users";
export default new AppRoute({
	execute: async (request, response) => {
		const count: number = await Users.savesCount();
		response.send(String(count));
	},
	method: "GET",
});
