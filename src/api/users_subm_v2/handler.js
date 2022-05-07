class UsersHandler_subm_v2 {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler_subm_v2 = this.postUserHandler_subm_v2.bind(this);
  }

  async postUserHandler_subm_v2(request, h) {
    this._validator.validateUserPayload(request.payload);

    const { username,password,fullname } = request.payload;
    const userId = await this._service.addUser({ username,password,fullname });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler_subm_v2;
