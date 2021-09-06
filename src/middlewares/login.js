const Middleware = require("../classes/Middleware");
const Users = require("../databases/Users");
module.exports = new Middleware({
	execute: async (request, response, next) => {
		if (request.headers["authorization"]) {
			if (request.headers.authorization.startsWith("Bearer")) {
				let authorization = request.headers.authorization.replace(
					"Bearer ",
					""
				);
				let result = await Users.getByToken(authorization);

				if (result) {
					request.user = result;
					next();
					return;
				} else {
					response.status(401).json({
						message: "Token is incorrect.",
					});
				}
			}
		}
		response.status(400).json({
			message: "Authorization is missing.",
		});
	},
});
