import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFlightData } from '../flightDataSlice';
import s from "../styles/flightOption.module.scss"; 
import img from "../assets/companyLogo.svg";

interface FlightRoute {
  origin: string;
  destination: string;
  departureTime: string; 
  arrivalTime: string; 
  flightDuration: string; 
  layovers: string[];
  layoverCount: number;
}

interface FlightOption {
  price: number;
  airlineLogo: string;
  origin: string;
  destination: string;
  departureTime: string; 
  arrivalTime: string; 
  flightDuration: string; 
  layovers: string[];
  layoverCount: number;
  returnRoute: FlightRoute;
}



const FlightOptions: React.FC = () => {
  const [visibleOptions, setVisibleOptions] = useState<number>(5);
  const totalOptions = useSelector((state: RootState) => state.flightData.length);
  const flightData = useSelector((state: RootState) => state.flightData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFlightData(flightData));
  }, [dispatch, flightData]);

  const handleShowMore = () => {
    const remainingOptions = totalOptions - visibleOptions;
    setVisibleOptions(prev => prev + Math.min(5, remainingOptions));
  };

  return (
    <div className={s.wrapper}>
      {flightData.slice(0, visibleOptions).map((option: FlightOption, index: number) => (
        <div key={index} className={s['flight-option']}>
          <div className={s['flight-info']}>
            <div className={s['logo-and-price']}>
              <span className={s['price']}>{option.price} $</span>
              <img src={img} alt="Airline Logo" />
            </div>
            <FlightRouteDetails route={option} />
            <FlightRouteDetails route={option.returnRoute} />
          </div>
        </div>
      ))}
      {totalOptions > visibleOptions && (
        <button className={s['show-more']} onClick={handleShowMore}>
          Показати ще {Math.min(5, totalOptions - visibleOptions)} квитків
        </button>
      )}
    </div>
  );
};

interface FlightRouteDetailsProps {
  route: FlightRoute;
}

const FlightRouteDetails: React.FC<FlightRouteDetailsProps> = ({ route }) => {
  const calculateDuration = (durationString: string): string => {
    const durationDate = new Date(durationString);
    const hours = durationDate.getUTCHours();
    const minutes = durationDate.getUTCMinutes();
  
    return  `${hours}г ${minutes}хв`;
  };

  return (
    <div className={s['flight-details']}>
      <div className={s['details']}>
        <div className={s['label']}>{route.origin} - {route.destination}</div>
        <div className={s['value']} style={{textTransform:'lowercase',fontSize:'14px',fontWeight:'600'}}>{route.departureTime} - {route.arrivalTime}</div>
      </div>
      <div className={s['details']}>
        <div className={s['label']}>В дорозі</div>
        <div className={s['value']} style={{textTransform:'lowercase',fontSize:'14px',fontWeight:'600'}}>{calculateDuration(route.flightDuration)}</div>
      </div>
      <div className={s['details']}>
        <div className={s['label']}>
          {route.layoverCount === 0
            ? "Без пересадок"
            : route.layoverCount === 1
            ? "1 Пересадка"
            : `${route.layoverCount} Пересадки`
          }
        </div>
        {route.layovers.map((layover, layoverIndex) => (
          <span className={s['value']} key={layoverIndex} >
            {layoverIndex > 0 && ', '}
            {layover}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlightOptions;
