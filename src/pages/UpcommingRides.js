import React, { useEffect, useState } from "react";
import RideCard from "../components/RideCard";

const UpcomingRides = ({ data, sFilter, cFilter }) => {
  const currentDate = new Date();
  const [upcomingRides, setUpcomingRides] = useState([]);
  let filteredResults;

  useEffect(() => {
    if (data) {
      calculateFutureRides(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const calculateFutureRides = (data) => {
    data.forEach((station) => {
      let stationDate = new Date(station.date);
      if (stationDate > currentDate) {
        setUpcomingRides((prev) => [...prev, station]);
      }
    });
  };

  filteredResults = upcomingRides;
  if (sFilter && sFilter !== "State" && filteredResults !== []) {
    filteredResults = upcomingRides.filter((station) => {
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
      {filteredResults.length === 0 ? (
        <div className="noRidesAvailable">
          Sorry, No rides available, Try again later.
        </div>
      ) : (
        filteredResults.map((ride) => (
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
        ))
      )}
    </React.Fragment>
  );
};
export default UpcomingRides;
