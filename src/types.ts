export interface FlightRoute {
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    flightDuration: string;
    layovers: string[];
    layoverCount: number;
  }
  
  export interface FlightOption {
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
  
  export interface RootState {
    sortedOptions: FlightOption[];
  }
  