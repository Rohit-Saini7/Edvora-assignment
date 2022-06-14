import { useState, useEffect } from "react";

function FilterMenu({
  stationData,
  handleDataFromStateFilter,
  handleDataFromCityFilter,
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  let s_visited = [],
    c_visited = [],
    stateFilter;

  useEffect(() => {
    if (stationData) {
      calculateStateOptions(stationData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationData]);

  const calculateStateOptions = (stationData) => {
    stationData.forEach((station) => {
      if (!s_visited.includes(station.state)) {
        s_visited.push(station.state);
      }
    });
    setStates(s_visited);
    s_visited = [];
  };

  const handleStateFilter = async (e) => {
    handleDataFromStateFilter(e.target.value);
    stateFilter = e.target.value;
    calculateCityOptions(stationData, stateFilter);
  };

  const calculateCityOptions = (stationData, stateFilter) => {
    stationData.forEach((station) => {
      if (station.state === stateFilter) {
        if (!c_visited.includes(station.city)) {
          c_visited.push(station.city);
        }
        setCities(c_visited);
      }
      console.log(c_visited);
    });
    c_visited = [];
  };

  const handleCityFilter = (e) => {
    handleDataFromCityFilter(e.target.value);
  };

  return (
    <div className="filterMenu">
      <div className="filterTitle">Filters</div>
      <div>
        <select
          className="filterOptions"
          onChange={handleStateFilter}
          defaultValue="State"
        >
          <option>State</option>
          {states.map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
        <select
          className="filterOptions"
          onChange={handleCityFilter}
          defaultValue="City"
        >
          <option>City</option>
          {cities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterMenu;
