const SongsHandler_subm_v1 = require('./handler', );
const routes = require('./routes', );

module.exports = {
  name: 'songs_subm_v1',
  version: '1.0.0',
  register: async (server, {
    service,
    validator
  }, ) => {
    const songsHandler_subm_v1 = new SongsHandler_subm_v1(service, validator);
    server.route(routes(songsHandler_subm_v1));
  },
};
