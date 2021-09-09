const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
const Main = require("../../../databases/Main");
const { GuildsInputs } = require("../../../types/types");
module.exports = new AppRoute({
	execute: async (request, response) => {
		const botGuilds = await Main.createQuery("SELECT * FROM guilds");
		return response.json(
			request.body.guilds
				.filter(
					(userGuild) =>
						parseInt(userGuild.permissions) & 0x0000000008 ||
						userGuild.owner === true
				)
				.map((userGuild) => {
					userGuild.isIn = botGuilds.find(
						(botGuild) => botGuild.discord_id === userGuild.id
					)
						? true
						: false;
					return userGuild;
				})
		);
	},
	method: "POST",
	middleWares: [login],
	validations: [GuildsInputs],
});
