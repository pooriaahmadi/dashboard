require("dotenv").config();
const config = {
	port: parseInt(process.env.PORT),
	host: process.env.ENDPOINT,
	front: process.env.FRONT,
	databaseConfig: {
		host: process.env.DATABASEHOST,
		port: parseInt(process.env.DATABASEPORT),
		username: process.env.DATABASEUSERNAME,
		password: process.env.DATABASEPASSWORD,
		databaseName: process.env.DATABASENAME,
	},
	discord: {
		endpoint: "https://discord.com/api/",
		clientId: process.env.DISCORDCLIENTID,
		clientSecret: process.env.DISCORDCLIENTSECRET,
		redirect: `${process.env.FRONT}/dashboard/return`,
		botToken: process.env.DISCORDBOTTOKEN,
	},
};
module.exports = config;
