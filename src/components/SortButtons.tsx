import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortFlightsByCheapest, sortFlightsByFastest, sortFlightsByOptimal } from '../flightDataSlice';
import s from '../styles/sortBattons.module.scss';

const SortButtons = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleSortByCheapest = () => {
    dispatch(sortFlightsByCheapest());
    setActiveButton('cheapest');
  };

  const handleSortByFastest = () => {
    dispatch(sortFlightsByFastest());
    setActiveButton('fastest');
  };

  const handleSortByOptimal = () => {
    dispatch(sortFlightsByOptimal());
    setActiveButton('optimal');
  };

  return (
    <div className={s.wrapper}>
      <button className={`${s['sort-button']} ${activeButton === 'cheapest' ? s['active'] : ''}`} onClick={handleSortByCheapest}>Найдешевший</button>
      <button className={`${s['sort-button']} ${activeButton === 'fastest' ? s['active'] : ''}`} onClick={handleSortByFastest}>Найшвидший</button>
      <button className={`${s['sort-button']} ${activeButton === 'optimal' ? s['active'] : ''}`} onClick={handleSortByOptimal}>Оптимальний</button>
    </div>
  );
}

export default SortButtons;
