const InvariantError = require('../../exceptions/InvariantError');
const { Playlist_subm_v2_PayloadSchema,PlaylistSong_subm_v2_PayloadSchema } = require('./schema');

const PlaylistsValidator_subm_v2 = {
  validatePlaylistPayload: (payload) => {
    const validationResult = Playlist_subm_v2_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePlaylistSongPayload: (payload) => {
    const validationResult = PlaylistSong_subm_v2_PayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator_subm_v2;
