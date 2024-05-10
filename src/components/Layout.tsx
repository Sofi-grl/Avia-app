
import "../styles/app.scss";
import Filter from "./Filter";
import logo from "../assets/logo.svg";
import SortButtons from './SortButtons';
import FlightOptions from './FlightOptions';

function Layout() {
  return (
    <div className='container'>
    <a href="/"><img src={logo} className='logo' alt="logo" /></a>
      <div className='content-wrapper'>
        <Filter />
        <div>
          <SortButtons />
          <FlightOptions />
        </div>
      </div>
    </div>
  );
}

export default Layout;