import Genre from './genre';
// import bootstrap from 'bootstrap'

const GENRES = ['rap', 'pop', 'edm', 'r&b', 'rock', 'latin'];

export default function Genres() {
  // var firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
  // firstScrollSpyEl.addEventListener('activate.bs.scrollspy', function () {
  //   console.log('scrollspy worked')
  // })
  // var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
  // dataSpyList.forEach(function (dataSpyEl) {
  //   bootstrap.ScrollSpy.getInstance(dataSpyEl)
  //     .refresh()
  // })
  // document && document.addEventListener('scroll', ())
  return (
    <div data-bs-spy="scroll" data-offset="0" tabIndex="0" data-bs-target="#genre-selector">
      <nav className="nav m-5 shadow-sm sticky-top navbar-light bg-light nav-pills nav-fill px-3" id="genre-selector">
      {/* <nav className="navbar navbar-light bg-light px-3" id="genre-selector"> */}
        {/* <ul className="nav nav-pills"> */}
          {GENRES.map((genre, genreIndex) => (
              <li className="nav-item" key={genreIndex}>
                <a className="nav-link fs-5 fw-bold text-capitalize py-3" href={"#" + genre}>{genre}</a>
              </li>
          ))}
        {/* </ul> */}
      </nav>
      {GENRES.map(genre => (
        <Genre key={genre} genre={genre}/>
      ))}
    </div>
  );
}
