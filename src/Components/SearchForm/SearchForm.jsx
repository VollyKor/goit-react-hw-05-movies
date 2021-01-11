import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsSearch as Icon } from 'react-icons/bs';
import { useQuery } from 'react-query';
import axios from 'axios';
import request from '../../service/apiRequest';

import s from './SearchForm.module.css';

export default function SearchForm() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('a');
  const [submitQuery, setSubmitQuery] = useState('');

  // const queryClient = useQueryClient();

  async function searchFilms(query) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=132f2a543c82d69a556f0bb280a697a7&query=${query}`,
    );
    const { data } = res;
    return data;
  }

  const { data, status } = useQuery(['filmQuery', query], e => {
    console.log(e.queryKey[1]);
    return request.searchFilms(e.queryKey[1]);
  });

  // console.log(data);

  function handleSubmit(e) {
    e.preventDefault();

    if (query.length > 0 && submitQuery !== query) {
      history.push({
        ...location,
        pathname: '/movies',
        search: `query=${query}`,
      });
      setSubmitQuery(query);
    }
  }
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="text"
            placeholder="query"
            onChange={({ target: { value } }) => setQuery(value)}
            value={query}
          />
          <button className={s.button} type="submit">
            <Icon aria-label="Search Icom" className={s.icon} />
          </button>
        </label>
      </form>
    </>
  );
}
