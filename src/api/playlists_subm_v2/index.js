const PlaylistsHandler_subm_v2 = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists_subm_v2',
  version: '1.0.0',
  register: async (server, {
    service,
    validator
  }) => {
    const playlistsapiHandler_subm_v2 = new PlaylistsHandler_subm_v2(service, validator);
    server.route(routes(playlistsapiHandler_subm_v2));
  },
};
