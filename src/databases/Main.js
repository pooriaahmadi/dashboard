const { Base, Database } = require("../classes/Database");
const config = require("../config");
const base = new Base(config.databaseConfig);
const Main = new Database({ base: base });
base.turnOn().then(() => {
	Main.base = base;
});
module.exports = Main;
