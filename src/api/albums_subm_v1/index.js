const AlbumsHandler_subm_v1 = require('./handler', );
const routes = require('./routes', );

module.exports = {
  name: 'albums_subm_v1',
  version: '1.0.1',
  register: async (server, {
    service,
    validator,
    storageService_subm_v3
  }, ) => {
    const albumsHandler_subm_v1 = new AlbumsHandler_subm_v1(service, validator, storageService_subm_v3);
    server.route(routes(albumsHandler_subm_v1));

  },
};
