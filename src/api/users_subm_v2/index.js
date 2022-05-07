const UsersHandler_subm_v2 = require('./handler', );
const routes = require('./routes', );

module.exports = {
  name: 'users_subm_v2',
  version: '1.0.0',
  register: async (server, {
    service,
    validator
  }, ) => {
    const usersHandler_subm_v2 = new UsersHandler_subm_v2(service, validator);
    server.route(routes(usersHandler_subm_v2));
  },
};
