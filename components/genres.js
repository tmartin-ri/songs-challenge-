import Genre from "./genre";

const GENRES = ["rap", "pop", "edm", "r&b", "rock", "latin"];

export default function Genres() {
  return (
    <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" data-bs-target="#genre-selector">
      <nav className="nav shadow-sm sticky-top navbar-light bg-light nav-pills nav-fill" id="genre-selector">
            {GENRES.map((genre, genreIndex) => (
                <li className="nav-item" key={genreIndex} id={genre + "-link"}>
                  <a className="nav-link fs-6 text-capitalize py-3" href={"#" + genre}>{genre}</a>
                </li>
            ))}
      </nav>
      {GENRES.map(genre => (
        <Genre key={genre} genre={genre}/>
      ))}
    </div>
  );
}
