const Joi = require('joi');

const PostAuthentication_subm_v2_PayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthentication_subm_v2_PayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthentication_subm_v2_PayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostAuthentication_subm_v2_PayloadSchema,
  PutAuthentication_subm_v2_PayloadSchema,
  DeleteAuthentication_subm_v2_PayloadSchema,
};