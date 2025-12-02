const Joi = require("joi");

const dogSchema = Joi.object({
	name: Joi.string().min(1).required(),
	breed: Joi.string().min(1).required(),
	age: Joi.number().integer().min(0).default(1), // 선택적 필드로 설정
});

module.exports = dogSchema;
