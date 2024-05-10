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
      const calculateTotalFlightDuration = (flight: FlightOption): number => {
        const outboundDuration = calculateFlightDurationInMinutes(flight.flightDuration);
        const returnDuration = calculateFlightDurationInMinutes(flight.returnRoute.flightDuration);
        return outboundDuration + returnDuration;
      };
      state.sort((a, b) => {
        const durationA = calculateTotalFlightDuration(a);
        const durationB = calculateTotalFlightDuration(b);
        console.log(durationA - durationB);
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
    
      if (selectedFilters.length === 0 || selectedFilters.includes('всі')) {
        return initialState;
      }
    
      const filteredFlights = initialState.filter(flight => {
        if (selectedFilters.includes('без пересадок') && flight.layoverCount === 0) {
          return true;
        }
        if (selectedFilters.includes('1 пересадка') && flight.layoverCount === 1) {
          return true;
        }
        if (selectedFilters.includes('2 пересадки') && flight.layoverCount === 2) {
          return true;
        }
        if (selectedFilters.includes('3 пересадки') && flight.layoverCount === 3) {
          return true;
        }
        return false;
      });
    
      return filteredFlights;
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