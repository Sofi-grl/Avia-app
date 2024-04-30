
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/app.scss";
import Filter from "./Filter";
import logo from "../assets/logo.svg";
import SortButtons from './SortButtons';
import FlightOptions from './FlightOptions';

function Layout() {
  return (
    <div>
      <Link to="/" className='logo-link'> 
        <img src={logo} className='logo' alt="logo" />
      </Link>
      <Filter />
      <SortButtons />
      <FlightOptions />
    </div>
  );
}

export default Layout;