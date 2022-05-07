const ExportsHandler_subm_v3 = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exports_subm_v3',
  version: '1.0.0',
  register: async (server, {
    service,
    validator,
    playlistsService_subm_v2
  }) => {
    const exportsHandler_subm_v3 = new ExportsHandler_subm_v3(service, validator, playlistsService_subm_v2);
    server.route(routes(exportsHandler_subm_v3));
  },
};
