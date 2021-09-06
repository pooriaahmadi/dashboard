const AppRoute = require("../../../classes/AppRoute");
const { discord } = require("../../../config");
const axios = require("axios").default;
const Users = require("../../../databases/Users");
module.exports = new AppRoute({
	execute: async (request, response) => {
		if (!request.query.code)
			return response.status(400).json({ message: "code is missing" });
		const data = {
			client_id: discord.clientId,
			client_secret: discord.clientSecret,
			grant_type: "authorization_code",
			code: request.query.code,
			redirect_uri: discord.redirect,
			scope: "identify guilds guilds.join",
		};
		const headers = {
			"content-type": "application/x-www-form-urlencoded",
		};
		try {
			const result = await axios.post(
				`${discord.endpoint}/oauth2/token`,
				new URLSearchParams(data),
				{
					headers: headers,
				}
			);
			const discordUser = await axios.get(`${discord.endpoint}/users/@me`, {
				headers: {
					Authorization: `Bearer ${result.data.access_token}`,
				},
			});
			let databaseUser = await Users.getByDiscordId(discordUser.data.id);
			if (databaseUser) {
				await databaseUser.updateToken({
					token: result.data.access_token,
					refreshToken: result.data.refresh_token,
				});
				await databaseUser.updateDiscordInformation({
					discriminator: discordUser.data.discriminator,
					username: discordUser.data.username,
				});
			} else {
				databaseUser = await Users.create({
					discordId: discordUser.data.id,
					username: discordUser.data.username,
					discriminator: discordUser.data.discriminator,
					token: result.data.access_token,
					refreshToken: result.data.refresh_token,
				});
			}
			await axios.put(
				`${discord.endpoint}/guilds/847800062183735327/members/${databaseUser.discordId}`,
				{
					access_token: databaseUser.token,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${discord.botToken}`,
					},
				}
			);
			return response.json(JSON.parse(JSON.stringify(databaseUser)));
		} catch (error) {
			console.log(error);
			return response.json({
				message: "code expired or server error happened.",
			});
		}
	},
	method: "GET",
});
