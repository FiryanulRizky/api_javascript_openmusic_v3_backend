const CollaborationsHandler_subm_v2 = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations_subm_v2',
  version: '1.0.0',
  register: async (server, {
    collaborationsService_subm_v2,
    playlistsService_subm_v2,
    validator
  }) => {
    const collaborationsHandler_subm_v2 = new CollaborationsHandler_subm_v2(
      collaborationsService_subm_v2,playlistsService_subm_v2,validator
    );
    server.route(routes(collaborationsHandler_subm_v2));
  }
};
