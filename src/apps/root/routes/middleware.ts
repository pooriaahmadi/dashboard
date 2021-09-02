import AppRoute from "../../../classes/AppRoute";
import test from "../../../middlewares/test";
export default new AppRoute({
	execute: async (request, response) => {
		response.send("asd");
	},
	middleWares: [test],
	method: "GET",
});
