class AuthenticationsHandler_subm_v2 {
  constructor(authenticationsService_subm_v2, usersService_subm_v2, tokenManager, validator) {
    this._authenticationsService_subm_v2 = authenticationsService_subm_v2;
    this._usersService_subm_v2 = usersService_subm_v2;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler_subm_v2 = this.postAuthenticationHandler_subm_v2.bind(this);
    this.putAuthenticationHandler_subm_v2 = this.putAuthenticationHandler_subm_v2.bind(this);
    this.deleteAuthenticationHandler_subm_v2 = this.deleteAuthenticationHandler_subm_v2.bind(this);
  }

  async postAuthenticationHandler_subm_v2(request,h) {
    this._validator.validatePostAuthenticationPayload(request.payload);
    const { username,password } = request.payload;
    const id = await this._usersService_subm_v2.verifyUserCredential(username, password);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService_subm_v2.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler_subm_v2(request) {
    this._validator.validatePutAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;
    await this._authenticationsService_subm_v2.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler_subm_v2(request) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;
    await this._authenticationsService_subm_v2.verifyRefreshToken(refreshToken);
    await this._authenticationsService_subm_v2.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler_subm_v2;
