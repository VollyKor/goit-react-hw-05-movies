import Gallery from '../Gallery/Gallery';

export default function MoviesView({ data }) {
  return data && <Gallery arrayOfObjects={data.results} />;
}