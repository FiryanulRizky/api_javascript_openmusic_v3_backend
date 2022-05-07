const Joi = require('joi');

const Playlist_subm_v2_PayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PlaylistSong_subm_v2_PayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  Playlist_subm_v2_PayloadSchema,
  PlaylistSong_subm_v2_PayloadSchema
};
