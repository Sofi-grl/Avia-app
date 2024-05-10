import React, { useState } from 'react';
import  s from "../styles/filter.module.scss";
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
  
    let updatedFilters: string[] = [...selectedFilters];
  
    if (value === "всі") {
      if (checked) {
        updatedFilters = checkboxOptions.map(option => option.value);
      } else {
        updatedFilters = [];
      }
    } else {
      if (checked) {
        updatedFilters.push(value);
      } else {
        updatedFilters = updatedFilters.filter(item => item !== value);
      }
  
      const allOthersChecked = checkboxOptions.slice(1).every(option => updatedFilters.includes(option.value));
      if (allOthersChecked && !updatedFilters.includes("всі")) {
        updatedFilters.push("всі");
      } else {
        updatedFilters = updatedFilters.filter(item => item !== "всі");
      }
    }
  
    setSelectedFilters(updatedFilters);
    dispatch(filterFlightsByLayovers(updatedFilters));
  };
  

  return (
    <div className={s['wrapper']}>
      <h3>Кількість пересадок</h3>
      {checkboxOptions.map((option) => (
        <label key={option.value} className={s['checkbox-label']}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedFilters.includes(option.value)}
            onChange={(e) => handleCheckboxChange(e, option.value)}
            className={s['checkbox-input']}
          />
          <span className={s['custom-checkbox']}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Filter;
