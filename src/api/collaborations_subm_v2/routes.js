const routes = (handler) => [{
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler_subm_v2,
    options: {
      auth: 'music_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler_subm_v2,
    options: {
      auth: 'music_jwt'
    }
  }
];

module.exports = routes;
