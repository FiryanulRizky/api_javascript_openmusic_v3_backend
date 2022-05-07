/* eslint-disable indent */
const Joi = require('joi');

const Collaboration_subm_v2_PayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required()
});

module.exports = {
  Collaboration_subm_v2_PayloadSchema
};
