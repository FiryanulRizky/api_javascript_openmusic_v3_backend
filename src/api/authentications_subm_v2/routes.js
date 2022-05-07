const routes = (handler) => [{
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler_subm_v2,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler_subm_v2,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler_subm_v2,
  },
];

module.exports = routes;