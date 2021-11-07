import Genre from './genre';
import { useState } from 'react';

const GENRES = ['rap', 'pop', 'edm', 'r&b', 'rock', 'latin'];

export default function Genres() {
  const [activeGenrePill, setActiveGenrePill] = useState(0)
  return (
    <>
      <ul className="nav nav-pills nav-fill">
        {GENRES.map((genre, genreIndex) => (
          <li className="nav-item" key={genre}>
            <a className="nav-link text-capitalize py-5" aria-current="page" aria-selected={genreIndex === activeGenrePill} href={"#" + genre}>{genre}</a>
          </li>
        ))}
      </ul>
      {GENRES.map(genre => (
        <Genre key={genre} genre={genre} />
      ))}
    </>
  );
}
