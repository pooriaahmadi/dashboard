const Joi = require("joi");

module.exports.GuildsInputs = Joi.object({
	guilds: Joi.array(),
});
