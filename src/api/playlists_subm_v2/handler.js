const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsHandler_subm_v2 {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Playlist
    this.postPlaylistHandler_subm_v2 = this.postPlaylistHandler_subm_v2.bind(this);
    this.getPlaylistsHandler_subm_v2 = this.getPlaylistsHandler_subm_v2.bind(this);
    this.getPlaylistByIdHandler_subm_v2 = this.getPlaylistByIdHandler_subm_v2.bind(this);
    this.deletePlaylistByIdHandler_subm_v2 = this.deletePlaylistByIdHandler_subm_v2.bind(this);

    // Playlist Song
    this.postPlaylistSongHandler_subm_v2 = this.postPlaylistSongHandler_subm_v2.bind(this);
    this.getPlaylistSongsHandler_subm_v2 = this.getPlaylistSongsHandler_subm_v2.bind(this);
    this.deletePlaylistSongByIdHandler_subm_v2 = this.deletePlaylistSongByIdHandler_subm_v2.bind(this);
    this.getPlaylistActivitiesHandler_subm_v2 = this.getPlaylistActivitiesHandler_subm_v2.bind(this);
  }

  async postPlaylistHandler_subm_v2(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const playlistId = await this._service.addPlaylist({ name,owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler_subm_v2(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async getPlaylistByIdHandler_subm_v2(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistAccess(id, credentialId);

    const playlist = await this._service.getPlaylistById(id);
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistByIdHandler_subm_v2(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  // Playlist Song
  async postPlaylistSongHandler_subm_v2(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { songId } = request.payload;
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(playlistId, credentialId);
    await this._service.addSongToPlaylist(playlistId, songId);
    await this._service.addActivity(playlistId, songId, credentialId);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler_subm_v2(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._service.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler_subm_v2(request) {
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(playlistId,credentialId);
    await this._service.deleteSongFromPlaylist(playlistId,songId);
    await this._service.deleteActivity(playlistId, songId,credentialId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }

  async getPlaylistActivitiesHandler_subm_v2(request,h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(id, credentialId);
    const activities = await this._service.getPlaylistActivities(id);

    const response = h.response({
      status: 'success',
      data: activities
    });

    response.code(200);
    return response;
  }

  async verifyPlaylistOwner(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== userId) {
      throw new AuthorizationError('You don\'t have the right to access this resource');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationService_subm_v2.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }

}

module.exports = PlaylistsHandler_subm_v2;
