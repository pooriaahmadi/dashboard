const AppRoute = require("../../../classes/AppRoute");
const login = require("../../../middlewares/login");
const { discord } = require("../../../config");
const axios = require("axios").default;
const Main = require("../../../databases/Main");
module.exports = new AppRoute({
	execute: async (request, response) => {
		const userGuilds = await axios.get(`${discord.endpoint}/users/@me/guilds`, {
			headers: {
				Authorization: `Bearer ${request.user.token}`,
			},
		});
		const botGuilds = await Main.createQuery("SELECT * FROM guilds");

		return response.json(
			userGuilds.data
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
	method: "GET",
	middleWares: [login],
});
