exports.up = pgm => {
    // buat tabel Cover Album
    pgm.sql('ALTER TABLE albums ADD COLUMN cover varchar(100)');

    // buat tabel Like Album
    pgm.createTable('user_album_likes', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true
        },
        user_id: {
          type: 'VARCHAR(50)',
          notNull: true
        },
        album_id: {
          type: 'VARCHAR(50)',
          notNull: true
        }
      });
      pgm.addConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
      pgm.addConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id', 'FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropColumns('albums', 'cover');
    pgm.dropConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id');
    pgm.dropConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id');
    pgm.dropTable('user_album_likes');
};