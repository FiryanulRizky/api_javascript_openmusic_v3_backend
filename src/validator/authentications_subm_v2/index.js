const { PostAuthentication_subm_v2_PayloadSchema,PutAuthentication_subm_v2_PayloadSchema,DeleteAuthentication_subm_v2_PayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator_subm_v2 = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthentication_subm_v2_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PutAuthentication_subm_v2_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthentication_subm_v2_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator_subm_v2;