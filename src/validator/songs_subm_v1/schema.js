const Joi = require('joi');

const Song_subm_v1_PayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string()
});

module.exports = { Song_subm_v1_PayloadSchema };
