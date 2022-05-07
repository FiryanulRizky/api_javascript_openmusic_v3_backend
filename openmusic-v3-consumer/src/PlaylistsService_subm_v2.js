const { Pool } = require('pg');

class PlaylistsService_subm_v2 {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const queryPlaylist = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlist_songs INNER JOIN playlists ON playlist_songs.playlist_id = playlists.id INNER JOIN users ON playlists.owner = users.id WHERE playlist_id = $1 LIMIT 1',
      values: [playlistId]
    };

    const queryUser = {
      text: 'SELECT username FROM playlists INNER JOIN users ON playlists.owner = users.id WHERE playlists.id = $1 LIMIT 1',
      values: [playlistId]
    };

    const querySongs = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlist_songs INNER JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_id = $1',
      values: [playlistId]
    };

    const resultPlaylist = await this._pool.query(queryPlaylist);
    const resultUser = await this._pool.query(queryUser);
    const resultSongs = await this._pool.query(querySongs);

    if (!resultPlaylist.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return {
      playlist: { id: resultPlaylist.rows[0].id,
      name: resultPlaylist.rows[0].name,
      songs: resultSongs.rows },
    };
  }

}

module.exports = PlaylistsService_subm_v2;
