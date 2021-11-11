import 'bootstrap/dist/css/bootstrap.css';

import { useRouter } from 'next/router';

import Songs from '../../components/songs';
import Header from '../../components/header';

export async function getServerSideProps({ params }) {
  let [pageOrInitialSearchOrDanceability, pageOrDanceability, danceability ] = params.q || [];

  if (pageOrDanceability) {
    if (parseInt(pageOrDanceability, 10) > 0) pageOrDanceability = parseInt(pageOrDanceability, 10);
    else {
      danceability = pageOrDanceability;
      pageOrDanceability = 1;
    }
  }
  if (pageOrInitialSearchOrDanceability) {
    if (parseInt(pageOrInitialSearchOrDanceability, 10) > 0) {
      pageOrDanceability = parseInt(pageOrInitialSearchOrDanceability, 10);
      pageOrInitialSearchOrDanceability = null;
    } else if (['danceable', 'semi_danceable', 'not_danceable'].includes(pageOrInitialSearchOrDanceability)) {
      danceability = pageOrInitialSearchOrDanceability;
      pageOrInitialSearchOrDanceability = null;
    }
  }

  return {
    props: {
      initialSearch: pageOrInitialSearchOrDanceability || null,
      page: pageOrDanceability || 1,
      danceability: danceability || 'all'
    }
  };
}

export default function App({ initialSearch, page, danceability }) {
  const router = useRouter();
  let danceabilityLow = 0, danceabilityHigh = 1;
  const performSearch = newSearch => {
    router.replace({ pathname: `/${newSearch}` });
  };
  if (danceability !== 'all') {
    if (danceability === 'danceable') {
      danceabilityLow = 0.75;
      danceabilityHigh = 1;
    } else if (danceability === 'semi_danceable') {
      danceabilityLow = 0.51;
      danceabilityHigh = 0.75;
    } else if (danceability === 'not_danceable') {
      danceabilityLow = 0;
      danceabilityHigh = 0.5;
    }
  }

  return (
    <main>
      <Header performSearch={performSearch} initialSearch={initialSearch} />

      <div className="py-5 bg-light">
        <div className="container">
          <Songs 
            {...{
              search: initialSearch,
              page,
              danceability,
              danceabilityLow, 
              danceabilityHigh
            }}
          />
        </div>
      </div>
    </main>
  );
}
