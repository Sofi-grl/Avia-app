import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import flightData from './flightData.json';

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

const initialState: FlightOption[] = flightData;

const flightDataSlice = createSlice({
  name: 'flightData',
  initialState,
  reducers: {
    setFlightData: (state, action: PayloadAction<FlightOption[]>) => {
      return action.payload;
    },
    sortFlightsByCheapest: (state) => {
      state.sort((a, b) => a.price - b.price);
    },
    sortFlightsByFastest: (state) => {
      state.sort((a, b) => {
        const durationA = calculateFlightDurationInMinutes(a.flightDuration);
        const durationB = calculateFlightDurationInMinutes(b.flightDuration);
        return durationA - durationB;
      });
    },
    sortFlightsByOptimal: (state) => {
      state.sort((a, b) => {
        const durationComparison = calculateFlightDurationInMinutes(a.flightDuration) - calculateFlightDurationInMinutes(b.flightDuration);
        if (durationComparison !== 0) {
          return durationComparison;
        }
        
        const layoverComparison = a.layoverCount - b.layoverCount;
        if (layoverComparison !== 0) {
          return layoverComparison;
        }
        
        return a.price - b.price;
      });
    },
    filterFlightsByLayovers: (state, action: PayloadAction<string[]>) => {
        const selectedFilters = action.payload;
        if (selectedFilters.includes('всі')) {
          return initialState; 
        } else {
          let filteredFlights = initialState; 
          if (selectedFilters.includes('без пересадок')) {
            filteredFlights = filteredFlights.filter((flight) => flight.layoverCount === 0);
          }
          if (selectedFilters.includes('1 пересадка')) {
            filteredFlights = filteredFlights.filter((flight) => flight.layoverCount === 1);
          }
          if (selectedFilters.includes('2 пересадки')) {
            filteredFlights = filteredFlights.filter((flight) => flight.layoverCount === 2);
          }
          if (selectedFilters.includes('3 пересадки')) {
            filteredFlights = filteredFlights.filter((flight) => flight.layoverCount === 3);
          }
          return filteredFlights;
        }
      },
      
      
      
  },
});

const calculateFlightDurationInMinutes = (durationString: string): number => {
  const duration = new Date(durationString);
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  return hours * 60 + minutes;
};

export const { setFlightData, sortFlightsByCheapest, sortFlightsByFastest, sortFlightsByOptimal, filterFlightsByLayovers } = flightDataSlice.actions;
export default flightDataSlice.reducer;
