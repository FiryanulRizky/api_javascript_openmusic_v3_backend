const InvariantError = require('../../exceptions/InvariantError');
const { Song_subm_v1_PayloadSchema } = require('./schema');

const SongsValidator_subm_v1 = {
  validateSongPayload: (payload) => {
    const validationResult = Song_subm_v1_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator_subm_v1;
