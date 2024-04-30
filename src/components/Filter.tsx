import React, { useState } from 'react';
import s from "../styles/filter.module.scss";
import { useDispatch } from 'react-redux';
import { filterFlightsByLayovers } from '../flightDataSlice';



interface CheckboxOption {
  label: string;
  value: string;
}

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const dispatch = useDispatch();

  const checkboxOptions: CheckboxOption[] = [
    { label: "Всі", value: "всі" },
    { label: "Без пересадок", value: "без пересадок" },
    { label: "1 пересадка", value: "1 пересадка" },
    { label: "2 пересадки", value: "2 пересадки" },
    { label: "3 пересадки", value: "3 пересадки" },
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const { checked } = event.target;

    let updatedFilters: string[] = [];

    if (value === "всі") {
      updatedFilters = checked ? checkboxOptions.map(option => option.value) : [];
    } else {
      if (checked) {
        updatedFilters = [value];
      } else {
        updatedFilters = [];
      }
    }

    setSelectedFilters(updatedFilters);
    dispatch(filterFlightsByLayovers(updatedFilters));
  };

  return (
    <div className={s.wrapper}>
      <h3>Кількість пересадок</h3>
      {checkboxOptions.map((option) => (
        <label key={option.value} className={s.checkboxLabel}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedFilters.includes(option.value)}
            onChange={(e) => handleCheckboxChange(e, option.value)}
            className={s.checkboxInput}
          />
          <span className={s.customCheckbox}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Filter;
