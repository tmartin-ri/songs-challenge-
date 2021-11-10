
export default function Danceable({ notDanceable, semiDanceable, danceable, danceability, setDanceAbility}) {
  function updateDanceability (newDanceability) {
    setDanceAbility(newDanceability)
  }
  return (
    <div className="float-lg-start">
      <div className="list-group">
        {!!danceable && <button onClick={() => updateDanceability('danceable')} className="list-group-item list-group-item-action">Danceable ({danceable})</button>}
        {!!semiDanceable && <button onClick={() => setDanceAbility('semi_danceable')} className="list-group-item list-group-item-action">Semi Danceable ({semiDanceable})</button>}
        {!!notDanceable && <button onClick={() => setDanceAbility('not_danceable')} className="list-group-item list-group-item-action">Not Danceable ({notDanceable})</button>}
        {danceability !== 'all' && <button onClick={() => setDanceAbility('all')} className="list-group-item list-group-item-action">Clear Filter</button>}
      </div>
    </div>
  )
}
