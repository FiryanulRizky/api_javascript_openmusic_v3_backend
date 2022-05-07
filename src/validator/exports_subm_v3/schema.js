const Joi = require('joi');

const ExportNotes_subm_v3_PayloadSchema = Joi.object({
  targetEmail: Joi.string().email({
    tlds: true
  }).required(),
});

module.exports = ExportNotes_subm_v3_PayloadSchema;