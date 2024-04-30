import React from 'react';
import { useDispatch } from 'react-redux';
import { sortFlightsByCheapest , sortFlightsByFastest,sortFlightsByOptimal} from '../flightDataSlice';
import s from '../styles/sortBattons.module.scss';

const SortButtons = () => {
  const dispatch = useDispatch();

  const handleSortByCheapest = () => {
    dispatch(sortFlightsByCheapest());
  };
  const handleSortByFastest = () => {
    dispatch(sortFlightsByFastest());
  };
  const handleSortByOptimal = () => {
    dispatch(sortFlightsByOptimal());
  };

  return (
    <div className={s.wrapper}>
      <button className={s.sortButton} onClick={handleSortByCheapest}>Найдешевший</button>
      <button className={s.sortButton} onClick={handleSortByFastest}>Найшвидший</button>
      <button className={s.sortButton} onClick={handleSortByOptimal}>Оптимальний</button>
    </div>
  );
}

export default SortButtons;
