import { request, gql } from 'graphql-request';
import useSWR from 'swr';
import Link from 'next/link';

import Danceable from './danceable';
import Song from './song';
import { useEffect, useState } from 'react';

const SONGS_QUERY = gql`
  query HomePage($page: Int!, $search: String) {
    Songs(page: $page, search: $search) {
      songs {
        track_id
        track_name
        track_artist
        track_popularity
        track_album_id
        track_album_name
        track_album_release_date
        playlist_name
        playlist_id
        playlist_genre
        playlist_subgenre
        danceability
        energy
        key
        loudness
        mode
        speechiness
        acousticness
        instrumentalness
        liveness
        valence
        tempo
        duration_ms
        album_cover_art_url
      }
      pageInfo {
        per_page
        current_page
        total
        has_more
        not_danceable
        semi_danceable
        danceable    
      }
    }
  }
`;

const fetcher = (page, search) =>
  request('http://localhost:3000/api/graphql', SONGS_QUERY, { page, search });

export default function Songs({ page, search }) {
  const { data, error } = useSWR([page, search], fetcher);
  const [danceability, setDanceAbility] = useState('all')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (danceability === 'danceable') {
      setSongs(data.Songs.songs.filter(song => song.danceability >= 0.75))
    } else if (danceability === 'semi_danceable') {
      setSongs(data.Songs.songs.filter(song => 0.51 > song.danceability < 0.75))
    } else if (danceability === 'not_danceable') {
      setSongs(data.Songs.songs.filter(song => song.danceability <= 0.5))
    } else setSongs(data?.Songs.songs)
  }, [danceability, data])

  if (!data && !error)
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) {
    console.error(error);
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="alert alert-danger" role="alert">
          Something bad happened!
        </div>
      </div>
    );
  }

  return (
    <>
      <Danceable 
        {...{
          notDanceable: data?.Songs.pageInfo.not_danceable,
          semiDanceable: data?.Songs.pageInfo.semi_danceable,
          danceable: data?.Songs.pageInfo.danceable,
          setDanceAbility
        }}
      />
      {songs?.length ? (
        <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5 g-3">
          {songs.map(song => (
            <Song key={song.track_id} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center">No Results!</p>
      )}
      <Pagination search={search} pageInfo={data.Songs.pageInfo} />
    </>
  );
}

function Pagination({ pageInfo, search }) {
  const currentPage = pageInfo.current_page || 1;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination mt-5 d-flex justify-content-center">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          {currentPage === 1 ? (
            <span className="page-link">Previous</span>
          ) : (
            <Link
              passHref
              href={`/${[search, currentPage - 1]
                .filter(part => part)
                .join('/')}`}>
              <a className="page-link">Previous</a>
            </Link>
          )}
        </li>

        <li className={pageInfo.has_more ? 'page-item' : 'page-item disabled'}>
          {pageInfo.has_more ? (
            <Link
              passHref
              href={`/${[search, currentPage + 1]
                .filter(part => part)
                .join('/')}`}>
              <a className="page-link">Next</a>
            </Link>
          ) : (
            <span className="page-link">Next</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
