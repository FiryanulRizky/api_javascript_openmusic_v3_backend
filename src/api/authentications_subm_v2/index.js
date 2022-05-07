const AuthenticationsHandler_subm_v2 = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications_subm_v2',
  version: '1.0.0',
  register: async (server, {
    authenticationsService_subm_v2,
    usersService_subm_v2,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler_subm_v2 = new AuthenticationsHandler_subm_v2(
      authenticationsService_subm_v2,
      usersService_subm_v2,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler_subm_v2));
  },
};