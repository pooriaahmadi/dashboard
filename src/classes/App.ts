import { AppInputs, AppModel } from "../types/Types";
import fs from "fs";
import path from "path";
const removeExtension = (str: string) => {
	return str.replace(".ts", "").replace(".js", "");
};
class App implements AppModel {
	route;
	constructor({ route }: AppInputs) {
		this.route = route;
	}
	getRoutes = (name?: string) => {
		let finalName = this.route;
		if (name) {
			finalName = name;
		}
		return fs
			.readdirSync(path.join(__dirname, "..", "apps", finalName, "routes"))
			.map((item: string) => {
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
export default App;
