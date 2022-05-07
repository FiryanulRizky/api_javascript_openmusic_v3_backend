class CollaborationsHandler_subm_v2 {
  constructor(collaborationsService_subm_v2, playlistsService_subm_v2, validator) {
    this._collaborationsService_subm_v2 = collaborationsService_subm_v2;
    this._playlistsService_subm_v2 = playlistsService_subm_v2;
    this._validator = validator;

    this.postCollaborationHandler_subm_v2 = this.postCollaborationHandler_subm_v2.bind(this);
    this.deleteCollaborationHandler_subm_v2 = this.deleteCollaborationHandler_subm_v2.bind(this);
  }

  async postCollaborationHandler_subm_v2(request,h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId,userId } = request.payload;

    await this._playlistsService_subm_v2.verifyPlaylistOwner(playlistId, credentialId);
    const collaborationId = await this._collaborationsService_subm_v2.addCollaboration(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId
      }
    });

    response.code(201);
    return response;
  }

  async deleteCollaborationHandler_subm_v2(request, ) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId,userId } = request.payload;

    await this._playlistsService_subm_v2.verifyPlaylistOwner(playlistId, credentialId);
    await this._collaborationsService_subm_v2.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus'
    };
  }
}

module.exports = CollaborationsHandler_subm_v2;
