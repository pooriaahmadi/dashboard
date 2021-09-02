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
	getRoutes = (name: string) => {
		return fs
			.readdirSync(path.join(__dirname, "..", "apps", name, "routes"))
			.map((item: string) => {
				return {
					name: removeExtension(item),
					class: require(path.join(
						__dirname,
						"..",
						"apps",
						name,
						"routes",
						item
					)).default,
				};
			});
	};
}
export default App;
