const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
const { SaveDeleteInputs } = require("../../../types/types");
const Main = require("../../../databases/Main");
module.exports = new AppRoute({
	execute: async (request, response) => {
		const result = await Main.createQuery(
			`SELECT * FROM saves WHERE user=${request.user.id} AND id=${request.body.id}`
		);
		if (result.length) {
			await Main.createQuery(`DELETE FROM saves WHERE id=${request.body.id}`);
			return response.json({
				message: "Save deleted successfully",
			});
		}
		return response.status(403).json({
			message: "Save not found or it's not yours",
		});
	},
	method: "DELETE",
	middleWares: [login],
	validations: [SaveDeleteInputs],
});
