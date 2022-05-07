exports.up = pgm => {
      // buat tabel users
      pgm.createTable('users', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        username: {
          type: 'VARCHAR(50)',
          unique: true,
          notNull: true,
        },
        password: {
          type: 'TEXT',
          notNull: true,
        },
        fullname: {
          type: 'TEXT',
          notNull: true,
        },
      });

      // buat tabel authentications
      pgm.createTable('authentications', {
        token: {
          type: 'TEXT',
          notNull: true,
        },
      });

      // buat tabel playlists
      pgm.createTable('playlists', {
        id: {
          type: 'VARCHAR(100)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: true,
        },
        owner: {
          type: 'VARCHAR(100)',
          notNull: true,
        },
      });
      pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users (id) ON DELETE CASCADE');

      // buat tabel playlist songs
      pgm.createTable('playlist_songs', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true
        },
        playlist_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        song_id: {
          type: 'VARCHAR(50)',
          notNull: true
        }
      });

      // buat foreign key playlistsong
      pgm.addConstraint('playlist_songs', 'fk_playlist.playlist_id_playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
      pgm.addConstraint('playlist_songs', 'fk_playlist.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');

      // buat tabel playlist song activities
      pgm.createTable('playlist_activities', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true
        },
        playlist_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        song_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        user_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        action: {
          type: 'VARCHAR(10)',
          notNull: true
        },
        time: {
          type: 'VARCHAR(50)',
          notNull: true
        }
      });

      // buat foreign key playlist activity
      pgm.addConstraint('playlist_activities', 'fk_playlist_activities.playlist_id_playlist.id', 'FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

      // buat tabel collaborations
      pgm.createTable('collaborations', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true
        },
        playlist_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        user_id: {
          type: 'VARCHAR(50)',
          notNull: true
        }
      });
      pgm.addConstraint('collaborations', 'unique_playlist_id_and_user_id', 'UNIQUE(playlist_id, user_id)');
      pgm.addConstraint('collaborations', 'fk_collaborations.playlist_id_playlist.id', 'FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
      pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users.id', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropTable('users');
    pgm.dropTable('authentications');
    pgm.dropTable('playlists');
    pgm.dropTable('playlist_songs');
    pgm.dropConstraint('playlist_songs', 'fk_playlist.playlist_id_playlist.id');
    pgm.dropConstraint('playlist_songs', 'fk_playlist.song_id_songs.id');
    pgm.dropTable('playlist_activities');
    pgm.dropConstraint('playlist_activities', 'fk_playlist_activities.playlist_id_playlist.id', 'FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
    pgm.dropTable('collaborations');
};