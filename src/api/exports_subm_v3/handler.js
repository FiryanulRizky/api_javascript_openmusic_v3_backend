class ExportsHandler_subm_v3 {
  constructor(service, validator, playlistsService_subm_v2) {
    this._service = service;
    this._validator = validator;
    this._playlistsService_subm_v2 = playlistsService_subm_v2;

    this.postExportPlaylistsHandler_subm_v3 = this.postExportPlaylistsHandler_subm_v3.bind(this);
  }

  async postExportPlaylistsHandler_subm_v3(request,h) {
    this._validator.validateExportNotesPayload(request.payload);
    const { playlistId } = request.params;
    const userId = request.auth.credentials.id;

    await this._playlistsService_subm_v2.verifyPlaylistAccess(playlistId, userId);

    const { targetEmail } = request.payload;
    const message = { playlistId,targetEmail };

    await this._service.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler_subm_v3;
