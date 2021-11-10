import Link from 'next/link';

export default function Danceable(props) {
  const { notDanceable, semiDanceable, danceable, search, danceabilityLow, danceabilityHigh } = props
  return (
    <div className="float-lg-start">
      <div className="list-group">
        {!!danceable && 
            <Link
              passHref
              href={`/${[search, 'danceable']
                .filter(part => part)
                .join('/')}`}>
              <a className={(danceabilityLow === 0.75) ? "list-group-item list-group-item-action fw-bold" : "list-group-item list-group-item-action"} style={{ color: 'blue' }}>Danceable ({danceable})</a>
            </Link>}
        {!!semiDanceable && 
            <Link
              passHref
              href={`/${[search, 'semi_danceable']
                .filter(part => part)
                .join('/')}`}>
              <a className={(danceabilityLow === 0.51) ? "list-group-item list-group-item-action fw-bold" : "list-group-item list-group-item-action"} style={{ color: 'blue' }}>Semi Danceable ({semiDanceable})</a>
            </Link>}
        {!!notDanceable && 
            <Link
              passHref
              href={`/${[search, 'not_danceable']
                .filter(part => part)
                .join('/')}`}>
              <a className={(danceabilityHigh === 0.5) ? "list-group-item list-group-item-action fw-bold" : "list-group-item list-group-item-action"} style={{ color: 'blue' }}>Not Danceable ({notDanceable})</a>
            </Link>}
        {(danceabilityLow > 0 || danceabilityHigh < 1) && 
            <Link
              passHref
              href={`/${[search]
                .filter(part => part)
                .join('/')}`}> 
                <a className="list-group-item list-group-item-action list-group-item-secondary">Clear Filter</a>
              </Link>}
      </div>
    </div>
  )
}
