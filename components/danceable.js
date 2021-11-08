
export default function Danceable({ notDanceable, semiDanceable, danceable, setDanceAbility}) {
  return (
    <div className="card">
      <ul className="list-group-flush">
      <li className="list-group-item">Danceable ({danceable})</li>
      <li className="list-group-item">Semi Danceable ({semiDanceable})</li>
      <li className="list-group-item">Not Danceable ({notDanceable})</li>
      </ul>
    </div>
  )
}
