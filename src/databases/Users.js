const Main = require("./Main");
const User = require("../classes/User");
const Vip = require("../classes/Vip");
class Users {
	constructor() {}
	all = async () => {
		const users = await Main.createQuery(
			"SELECT users.id, users.discord_id, users.username, users.discriminator, users.used_commands, users.is_staff, users.refresh_token, users.token,vip.id as vip_id, vip.start, vip.end FROM users LEFT JOIN vip on vip.user=users.id"
		);
		users.forEach((item, index) => {
			users[index] = new User({
				id: item.id,
				discordId: item.discord_id,
				username: item.username,
				discriminator: item.discriminator,
				usedCommands: item.used_commands,
				isStaff: item.is_staff,
				vip:
					"vip_id" in item
						? new Vip({
								id: item.vip_id,
								start: item.start,
								end: item.end,
						  })
						: null,
				refreshToken: item.refresh_token,
				token: item.token,
			});
		});
		return users;
	};
	getById = async (id) => {
		let user = await Main.createQuery(
			`SELECT users.id, users.discord_id, users.username, users.discriminator, users.used_commands, users.is_staff,users.refresh_token, users.token,vip.id as vip_id, vip.start, vip.end FROM users LEFT JOIN vip on vip.user=users.id WHERE users.id=${id}`
		);
		if (user.length) {
			user = user[0];
			return new User({
				id: user.id,
				discordId: user.discord_id,
				username: user.username,
				discriminator: user.discriminator,
				usedCommands: user.used_commands,
				isStaff: user.is_staff,
				vip:
					"vip_id" in user
						? new Vip({
								id: user.vip_id,
								start: user.start,
								end: user.end,
						  })
						: null,
				refreshToken: user.refresh_token,
				token: user.token,
			});
		}
	};
	getByToken = async (token) => {
		let user = await Main.createQuery(
			`SELECT users.id, users.discord_id, users.username, users.discriminator, users.used_commands, users.is_staff,users.refresh_token, users.token,vip.id as vip_id, vip.start, vip.end FROM users LEFT JOIN vip on vip.user=users.id WHERE users.token='${token}'`
		);
		if (user.length) {
			user = user[0];
			return new User({
				id: user.id,
				discordId: user.discord_id,
				username: user.username,
				discriminator: user.discriminator,
				usedCommands: user.used_commands,
				isStaff: user.is_staff,
				vip:
					"vip_id" in user
						? new Vip({
								id: user.vip_id,
								start: user.start,
								end: user.end,
						  })
						: null,
				refreshToken: user.refresh_token,
				token: user.token,
			});
		}
	};
	getByDiscordId = async (id) => {
		let user = await Main.createQuery(
			`SELECT users.id, users.discord_id, users.username, users.discriminator, users.used_commands, users.is_staff,users.refresh_token, users.token,vip.id as vip_id, vip.start, vip.end FROM users LEFT JOIN vip on vip.user=users.id WHERE discord_id=${id}`
		);
		if (user.length) {
			user = user[0];
			return new User({
				id: user.id,
				discordId: user.discord_id,
				username: user.username,
				discriminator: user.discriminator,
				usedCommands: user.used_commands,
				isStaff: user.is_staff,
				vip:
					"vip_id" in user
						? new Vip({
								id: user.vip_id,
								start: user.start,
								end: user.end,
						  })
						: null,
				refreshToken: user.refresh_token,
				token: user.token,
			});
		}
	};
	getStaffs = async () => {
		const users = await Main.createQuery(
			`SELECT users.id, users.discord_id, users.username, users.discriminator, users.used_commands, users.is_staff,users.refresh_token, users.token,vip.id as vip_id, vip.start, vip.end FROM users LEFT JOIN vip on vip.user=users.id WHERE is_staff=1`
		);
		users.forEach((item, index) => {
			users[index] = new User({
				id: item.id,
				discordId: item.discord_id,
				username: item.username,
				discriminator: item.discriminator,
				usedCommands: item.used_commands,
				isStaff: item.is_staff,
				vip:
					"vip_id" in item
						? new Vip({
								id: item.vip_id,
								start: item.start,
								end: item.end,
						  })
						: null,
				refreshToken: item.refresh_token,
				token: item.token,
			});
		});
		return users;
	};
	create = async ({
		discordId,
		username,
		discriminator,
		refreshToken,
		token,
	}) => {
		const user = await Main.createQuery(
			`INSERT INTO users(id, discord_id, username, discriminator, used_commands, is_staff, token, refresh_token) VALUES (NULL, '${discordId}', '${username}', '${discriminator}', 0, 0, '${token}', '${refreshToken}')`
		);
		return new User({
			id: user.insert_id,
			discordId: discordId,
			username: username,
			discriminator: discriminator,
			usedCommands: 0,
			isStaff: false,
			vip: null,
			token: token,
			refreshToken: refreshToken,
		});
	};
	savesCount = async () => {
		const result = await Main.createQuery("SELECT COUNT(*) FROM saves");
		return result[0]["COUNT(*)"];
	};
	usersCount = async () => {
		const result = await Main.createQuery("SELECT COUNT(*) FROM users");
		return result[0]["COUNT(*)"];
	};
}
module.exports = new Users();
