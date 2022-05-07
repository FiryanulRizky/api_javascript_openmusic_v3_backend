const routes = (handler) => [{
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}',
    handler: handler.getPlaylistByIdHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },

  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongByIdHandler_subm_v2,
    options: {
      auth: 'music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistActivitiesHandler_subm_v2,
    options: {
      auth: 'music_jwt'
    }
  },
];

module.exports = routes;
