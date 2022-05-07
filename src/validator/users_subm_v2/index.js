const InvariantError = require('../../exceptions/InvariantError');
const { User_subm_v2_PayloadSchema } = require('./schema');

const UsersValidator_subm_v2 = {
  validateUserPayload: (payload) => {
    const validationResult = User_subm_v2_PayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator_subm_v2;
