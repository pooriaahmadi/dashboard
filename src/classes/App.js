const fs = require("fs");
const path = require("path");
const removeExtension = (str) => {
	return str.replace(".ts", "").replace(".js", "");
};
class App {
	route;
	constructor({ route }) {
		this.route = route;
	}
	getRoutes = (name) => {
		const finalName = name || this.route;
		return fs
			.readdirSync(path.join(__dirname, "..", "apps", finalName, "routes"))
			.map((item) => {
				return {
					name: removeExtension(item),
					class: require(path.join(
						__dirname,
						"..",
						"apps",
						finalName,
						"routes",
						item
					)),
				};
			});
	};
	getRouter = (name) => {
		const finalName = name || this.route;
	};
}
module.exports = App;
