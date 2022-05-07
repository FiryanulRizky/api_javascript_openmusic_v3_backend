const path = require('path');

const routes = (handler) => [{
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler_subm_v1,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler_subm_v1,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler_subm_v1,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler_subm_v1,
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postUploadCoverHandler_subm_v3,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000
      }
    }
  },
  {
    method: 'GET',
    path: '/albums/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file')
      }
    }
  },
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.postAlbumLikeHandler_subm_v3,
    options: {
      auth: 'music_jwt'
    }
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.getAlbumLikesHandler_subm_v3
  }
];

module.exports = routes;
