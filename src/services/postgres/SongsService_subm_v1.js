const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { filterPerformerSongByParam,filterTitleSongByParam,mapSongDB } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService_subm_v1 {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title,year,performer,genre,duration,albumId }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }
  async getSongs(params) {
    const query = {
      text: 'SELECT id, title, performer FROM songs'
    };
    const result = await this._pool.query(query);
    const songs = result.rows;
    let filteredSong = songs;
    if ('title' in params) {
      filteredSong = filteredSong.filter((s) => filterTitleSongByParam(s, params.title));
    }
    if ('performer' in params) {
      filteredSong = filteredSong.filter((s) => filterPerformerSongByParam(s, params.performer));
    }

    return filteredSong;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapSongDB)[0];
  }

  async editSongById(id, { title,year,performer,genre,duration }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5 WHERE id = $6 RETURNING id',
      values: [title, year, performer, genre, duration, id]
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService_subm_v1;
