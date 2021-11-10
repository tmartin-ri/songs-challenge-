const PER_PAGE = 15;

export default {
  Query: {
    async Songs(root, args, { db }) {
      const { page, search, danceabilityLow, danceabilityHigh } = args.input
      const offsetStart = PER_PAGE * (page - 1);
      const offsetEnd = offsetStart + PER_PAGE;

      const query = search
        ? `SELECT * FROM songs
      WHERE (danceability >= ${danceabilityLow}
      AND danceability <= ${danceabilityHigh})
      AND (track_name LIKE '%${search}%'
      OR track_artist LIKE '%${search}%'
      OR track_album_name LIKE '%${search}%')
      ORDER BY track_name ASC
      LIMIT ${PER_PAGE} OFFSET ${offsetStart}`
        : `SELECT * FROM songs
      WHERE danceability >= ${danceabilityLow}
      AND danceability <= ${danceabilityHigh}
      ORDER BY track_name ASC
      LIMIT ${PER_PAGE} OFFSET ${offsetStart}`;

      const stmt = db.prepare(query);

      const rows = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }

      const totalResult = await db.exec(
        search
          ? `SELECT COUNT(*) FROM songs
        WHERE track_name LIKE '%${search}%'
        OR track_artist LIKE '%${search}%'
        OR track_album_name LIKE '%${search}%'`
        : 'SELECT COUNT(*) FROM songs'
      );
      const not_danceable = await db.exec(
        search
          ? `SELECT COUNT(*) FROM songs
        WHERE (track_name LIKE '%${search}%'
        OR track_artist LIKE '%${search}%'
        OR track_album_name LIKE '%${search}%')
        AND danceability <= 0.5`
        : `SELECT COUNT(*) FROM songs
        WHERE danceability <= 0.5`
      );
      const semi_danceable = await db.exec(
        search
          ? `SELECT COUNT(*) FROM songs
        WHERE (track_name LIKE '%${search}%'
        OR track_artist LIKE '%${search}%'
        OR track_album_name LIKE '%${search}%')
        AND (danceability > 0.5 AND 0.75 > danceability)`
        : `SELECT COUNT(*) FROM songs
        WHERE danceability > 0.5 AND 0.75 > danceability`
      );
      const danceable = await db.exec(
        search
          ? `SELECT COUNT(*) FROM songs
        WHERE (track_name LIKE '%${search}%'
        OR track_artist LIKE '%${search}%'
        OR track_album_name LIKE '%${search}%')
        AND danceability >= 0.75`
        : `SELECT COUNT(*) FROM songs
        WHERE danceability >= 0.75`
      );
      const total = totalResult[0].values[0][0];

      return {
        songs: rows,
        pageInfo: {
          per_page: PER_PAGE,
          current_page: page,
          total: total,
          has_more: offsetEnd < total,
          not_danceable: not_danceable[0].values[0][0],
          semi_danceable: semi_danceable[0].values[0][0],
          danceable: danceable[0].values[0][0],
        }
      };
    },

    async SongsByGenre(root, { genre }, { db }) {
      const query =
        'SELECT * FROM songs WHERE playlist_genre = $genre ORDER BY random() LIMIT 5';

      const stmt = db.prepare(query);
      stmt.bind({ $genre: genre });

      const rows = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }

      return rows;
    }
  }
};
