class AlbumsHandler_subm_v1 {
  constructor(service, validator, storageService_subm_v3) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler_subm_v1 = this.postAlbumHandler_subm_v1.bind(this);
    this.getAlbumByIdHandler_subm_v1 = this.getAlbumByIdHandler_subm_v1.bind(this);
    this.putAlbumByIdHandler_subm_v1 = this.putAlbumByIdHandler_subm_v1.bind(this);
    this.deleteAlbumByIdHandler_subm_v1 = this.deleteAlbumByIdHandler_subm_v1.bind(this);

    this._storageService_subm_v3 = storageService_subm_v3;
    this.postUploadCoverHandler_subm_v3 = this.postUploadCoverHandler_subm_v3.bind(this);
    this.postAlbumLikeHandler_subm_v3 = this.postAlbumLikeHandler_subm_v3.bind(this);
    this.getAlbumLikesHandler_subm_v3 = this.getAlbumLikesHandler_subm_v3.bind(this);
  }

  async postAlbumHandler_subm_v1(request,h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name,year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    }, );
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler_subm_v1(request,h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const response = h.response({
      status: 'success',
      data: {
        album: album
      }
    });

    if (album.source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }
    return response;
  }
  async putAlbumByIdHandler_subm_v1(request,h) {
    this._validator.validateAlbumPayload(request.payload);

    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diubah'
    });

    response.code(200);
    return response;
  }

  async deleteAlbumByIdHandler_subm_v1(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }

  // cover album
  async postUploadCoverHandler_subm_v3(request,h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this._validator.validateAlbumCover(cover.hapi.headers);

    const filename = await this._storageService_subm_v3.writeFile(cover, cover.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums_subm_v1/file/covers/${filename}`;

    await this._service.postAlbumCoverById(id, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah'
    });

    response.code(201);
    return response;
  }

  // like
  async postAlbumLikeHandler_subm_v3(request,h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    const message = await this._service.postUserAlbumLikeById(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: message
    });

    response.code(201);
    return response;
  }

  async getAlbumLikesHandler_subm_v3(request, h) {
    const { id: albumId } = request.params;
    const likes = await this._service.getUserAlbumLikesById(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: likes.albumLikes
      }
    });
    if (likes.source === 'cache') {
      response.header('X-Data-Source', 'cache');
      return response;
    }
    return response;
  }
}

module.exports = AlbumsHandler_subm_v1;
