const path = require('path');
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const ClientError = require('./exceptions/ClientError');

// songs - submission 1
const songs_subm_v1 = require('./api/songs_subm_v1');
const SongsValidator_subm_v1 = require('./validator/songs_subm_v1');
const SongsService_subm_v1 = require('./services/postgres/SongsService_subm_v1');

// albums - submission 1
const albums_subm_v1 = require('./api/albums_subm_v1');
const AlbumsService_subm_v1 = require('./services/postgres/AlbumsService_subm_v1');
const AlbumsValidator_subm_v1 = require('./validator/albums_subm_v1');

// users - submission 2
const users_subm_v2 = require('./api/users_subm_v2');
const UsersService_subm_v2 = require('./services/postgres/UsersService_subm_v2');
const UsersValidator_subm_v2 = require('./validator/users_subm_v2');

// authentications - submission 2
const authentications_subm_v2 = require('./api/authentications_subm_v2');
const AuthenticationsService_subm_v2 = require('./services/postgres/AuthenticationsService_subm_v2');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator_subm_v2 = require('./validator/authentications_subm_v2');

// Playlist - submission 2
const playlists_subm_v2 = require('./api/playlists_subm_v2');
const PlaylistsService_subm_v2 = require('./services/postgres/PlaylistsService_subm_v2');
const PlaylistsValidator_subm_v2 = require('./validator/playlists_subm_v2');

// Collaborations - submission 2
const Collaborations_subm_v2 = require('./api/collaborations_subm_v2');
const CollaborationsService_subm_v2 = require('./services/postgres/CollaborationsServices_subm_v2');
const CollaborationsValidator_subm_v2 = require('./validator/collaborations_subm_v2');

// Exports - submission 3
const _exports_subm_v3 = require('./api/exports_subm_v3');
const ProducerService_subm_v3 = require('./services/rabbitmq/ProducerService_subm_v3');
const ExportsValidator_subm_v3 = require('./validator/exports_subm_v3');

// Storage - submission 3
const StorageService_subm_v3 = require('./services/storage/StorageService_subm_v3');

// Cache - submission 3
const CacheService_subm_v3 = require('./services/redis/CacheService_subm_v3');

const init = async () => {

  const cacheService_subm_v3 = new CacheService_subm_v3();
  const collaborationsService_subm_v2 = new CollaborationsService_subm_v2();
  const albumsService_subm_v1 = new AlbumsService_subm_v1(cacheService_subm_v3);
  const playlistsService_subm_v2 = new PlaylistsService_subm_v2(collaborationsService_subm_v2);
  const authenticationsService_subm_v2 = new AuthenticationsService_subm_v2();
  const usersService_subm_v2 = new UsersService_subm_v2();
  const storageService_subm_v3 = new StorageService_subm_v3(path.resolve(__dirname, 'api/albums/file/covers'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  }, );

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const {
      response
    } = request;

    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit sesuai kebutuhan error handling
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return response.continue || response;
  });

  // registrasi plugin eksternal
  await server.register([{
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('music_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([{
      plugin: songs_subm_v1,
      options: {
        service: new SongsService_subm_v1(),
        validator: SongsValidator_subm_v1,
      },
    },
    {
      plugin: albums_subm_v1,
      options: {
        service: albumsService_subm_v1,
        validator: AlbumsValidator_subm_v1,
        storageService_subm_v3: storageService_subm_v3,
      },
    },
    {
      plugin: users_subm_v2,
      options: {
        service: usersService_subm_v2,
        validator: UsersValidator_subm_v2,
      },
    },
    {
      plugin: authentications_subm_v2,
      options: {
        authenticationsService_subm_v2,
        usersService_subm_v2,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator_subm_v2,
      },
    },
    {
      plugin: playlists_subm_v2,
      options: {
        service: playlistsService_subm_v2,
        validator: PlaylistsValidator_subm_v2,
      },
    },
    {
      plugin: Collaborations_subm_v2,
      options: {
        collaborationsService_subm_v2,
        playlistsService_subm_v2,
        validator: CollaborationsValidator_subm_v2
      }
    },
    {
      plugin: _exports_subm_v3,
      options: {
        service: ProducerService_subm_v3,
        validator: ExportsValidator_subm_v3,
        playlistsService_subm_v2,
      },
    },
  ], );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
