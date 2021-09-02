import { Base, Database } from "../classes/database";
import config from "../config";

const base = new Base(config.databaseConfig);
const Main: Database = new Database({ base: base });
base.turnOn().then(() => {
	Main.base = base;
});
export default Main;
