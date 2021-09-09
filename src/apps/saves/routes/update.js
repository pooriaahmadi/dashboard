const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
const { SaveUpdateInputs } = require("../../../types/types");
const Main = require("../../../databases/Main");
module.exports = new AppRoute({
	execute: async (request, response) => {
		if (request.body.media) {
			if (!request.user.vip) {
				return response.status(403).json({ message: "Vip required for MEDIA" });
			}
		}
		const result = await Main.createQuery(
			`SELECT * FROM saves WHERE user=${request.user.id} AND id=${request.body.id}`
		);
		if (result.length) {
			await Main.createQuery(
				Main.resolveUpdateValues({
					table: "saves",
					values: request.body,
				}) + `WHERE id=${request.body.id}`
			);
			return response.json({
				message: "Save updated successfully",
			});
		}
		return response.status(403).json({
			message: "Save not found or it's not yours",
		});
	},
	method: "GET",
	middleWares: [login],
	validations: [SaveUpdateInputs],
});
