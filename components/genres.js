import Genre from './genre';
import { useEffect } from 'react';
// import bootstrap from 'bootstrap'

const GENRES = ['rap', 'pop', 'edm', 'r&b', 'rock', 'latin'];

export default function Genres() {
  useEffect(() => {
    //Query objects on document load 
    const sections = document.querySelectorAll("h2.text-capitalize")
    console.log(`We have ${sections.length} sections`)
    
    // Create options for Observer:
    const options = {
      rootMargin: '100px 0px',
      threshold: [0.25, 0, 0.25, 0]
    }
    
    // Create instance of IO:
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log(entries)
        if (entry.intersectionRatio > 0) {
          const menuItem = document.getElementById(entry.target.id + '-link')
          if (menuItem !== null) menuItem.classList.add('nav-pills-link-active-color')
        } else {
          const menuItem = document.getElementById(entry.target.id + '-link')
          console.log(menuItem)
          if (menuItem !== null) menuItem.classList.remove('active')
        }
      })
    }, options)
    
    // Iterate over each queried el, and add observer:
    sections.forEach(section => { 
      observer.observe(section)
    })
}, [])
  return (
    <div>
      <nav className="nav shadow-sm sticky-top navbar-light bg-light nav-pills nav-fill" id="genre-selector">
          {GENRES.map((genre, genreIndex) => (
              <li className="nav-item" key={genreIndex} id={genre + '-link'}>
                <a className="nav-link fs-6 text-capitalize py-3" href={"#" + genre}>{genre}</a>
              </li>
          ))}
      </nav>
    {/* <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" data-bs-target="#genre-selector" className="scrollspy-example"> */}
    {GENRES.map(genre => (
        <Genre key={genre} genre={genre}/>
      ))}
    {/* </div> */}
    </div>
  );
}
