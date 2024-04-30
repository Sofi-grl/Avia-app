
import { FlightOption } from './types'; 

export const FETCH_FLIGHT_DATA = 'FETCH_FLIGHT_DATA';

export const fetchFlightData = (data: FlightOption[]) => ({
  type: FETCH_FLIGHT_DATA,
  payload: data,
});
