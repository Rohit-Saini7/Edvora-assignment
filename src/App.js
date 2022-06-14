import { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import "./components/Ridebar.css";
import Navbar from "./components/Navbar";
import PastRides from "./pages/PastRides";
import NearestRides from "./pages/NearestRides";
import FilterMenu from "./components/FilterMenu";
import UpcommingRides from "./pages/UpcommingRides";

function App() {
  const [user, setUser] = useState([]);
  const [cityFilter, setCityFilter] = useState();
  const [stationData, setStationData] = useState();
  const [stateFilter, setStateFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("nearest");

  useEffect(() => {
    fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));

    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((rides) => setStationData(rides))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (e) => {
    e.target.classList.add("selected");
    document.getElementById(selectedTab).classList.remove("selected");
    setSelectedTab(e.target.id);
  };

  const handleDataFromStateFilter = (data) => setStateFilter(data);
  const handleDataFromCityFilter = (data) => setCityFilter(data);

  return (
    <div>
      <Navbar userName={user.name} userImage={user.url} />
      <Router>
        {
          // * -----------------------Ridebar menu starts-----------------------
          // *        -----Ridebar.css styles apply in this section-----
        }
        <header className="ridebar">
          <NavLink to="/">
            <button
              className="nearestRides selected"
              id="nearest"
              onClick={handleClick}
            >
              Nearest rides
            </button>
          </NavLink>
          <NavLink to="/upcomming-rides">
            <button
              className="upcommingRides"
              id="upcomming"
              onClick={handleClick}
            >
              Upcomming rides
            </button>
          </NavLink>
          <NavLink to="/past-rides">
            <button className="pastRides" id="past" onClick={handleClick}>
              Past rides
            </button>
          </NavLink>
          <div className="filter">
            <SortIcon className="icon" />
            <button
              className="filterRides"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
          </div>
        </header>
        {
          showFilters ? (
            <FilterMenu
              stationData={stationData}
              handleDataFromStateFilter={handleDataFromStateFilter}
              handleDataFromCityFilter={handleDataFromCityFilter}
            />
          ) : null
          // * ------------------------Ridebar menu ends------------------------
        }
        <Routes>
          <Route
            path="/"
            element={
              <NearestRides
                data={stationData}
                sFilter={stateFilter}
                cFilter={cityFilter}
                userStation={user.station_code}
              />
            }
          />
          <Route
            path="/upcomming-rides"
            element={
              <UpcommingRides
                data={stationData}
                sFilter={stateFilter}
                cFilter={cityFilter}
              />
            }
          />
          <Route
            path="/past-rides"
            element={
              <PastRides
                data={stationData}
                sFilter={stateFilter}
                cFilter={cityFilter}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
