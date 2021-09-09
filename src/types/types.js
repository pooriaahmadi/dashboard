const Joi = require("joi");

module.exports.GuildsInputs = Joi.object({
	guilds: Joi.array().required(),
});

module.exports.SaveUpdateInputs = Joi.object({
	id: Joi.number().required(),
	title: Joi.string().min(3).max(199),
	content: Joi.string().min(1),
	media: Joi.string().uri(),
});

module.exports.SaveDeleteInputs = Joi.object({
	id: Joi.number().required(),
});
