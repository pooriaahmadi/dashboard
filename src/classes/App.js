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
		let finalName = this.route;
		if (name) {
			finalName = name;
		}
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
					)).default,
				};
			});
	};
}
module.exports = App;
