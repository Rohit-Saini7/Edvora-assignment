import React, { useEffect, useState } from "react";
import RideCard from "../components/RideCard";

const PastRides = ({ data, sFilter, cFilter }) => {
  const currentDate = new Date();
  const [pastRides, setPastRides] = useState([]);
  let filteredResults;

  useEffect(() => {
    if (data) {
      calculatePastRides(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const calculatePastRides = (data) => {
    data.forEach((station) => {
      let st_date = new Date(station.date);
      if (st_date < currentDate) {
        setPastRides((prev) => [...prev, station]);
      }
    });
  };

  filteredResults = pastRides;
  if (sFilter && sFilter !== "State" && filteredResults !== []) {
    filteredResults = pastRides.filter((station) => {
      return station.state === sFilter;
    });
  }
  if (cFilter && cFilter !== "City" && filteredResults !== []) {
    filteredResults = filteredResults.filter((station) => {
      return station.city === cFilter;
    });
  }

  return (
    <React.Fragment>
      {filteredResults.map((ride) => (
        <RideCard
          id={ride.id}
          key={1 + Math.random() * 100000000}
          originStation={ride.origin_station_code}
          stationPath={"[" + ride.station_path.toString() + "]"}
          date={ride.date}
          imageLink={ride.map_url}
          distance={ride.distance}
          cityName={ride.city}
          stateName={ride.state}
        />
      ))}
    </React.Fragment>
  );
};
export default PastRides;
