import { useEffect, useState } from 'react';
import s from './HomeView.module.css';
import request from '../../service/apiRequest';
import Gallery from '../Gallery/Gallery';

export default function HomeView() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState({});

  useEffect(() => {
    setStatus('pending');
    request
      .getTrendFilms()
      .then(data => {
        setData(data);

        if (data.results.length > 0) {
          setStatus('resolved');
        }
      })
      .catch(error => {
        setStatus('rejected');
        throw error;
      });
  }, []);

  if (status === 'idle') {
    return <h2>:Ждем</h2>;
  }
  if (status === 'pending') {
    return <h2>Загружаю</h2>;
  }
  if (status === 'resolved') {
    return <Gallery arrayOfObjects={data.results}></Gallery>;
  }
  return <h2>Пусто</h2>;
  // return <div>Что то пошло не так</div>;
}