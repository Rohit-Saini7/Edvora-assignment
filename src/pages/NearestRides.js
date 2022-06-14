import React, { useEffect, useState } from "react";
import RideCard from "../components/RideCard";

const NearestRides = ({ data, sFilter, cFilter, userStation }) => {
  const [nearestRides, setNearestRides] = useState([]);

  let visited = [];
  let filteredResults;

  useEffect(() => {
    if (data) {
      calculateNearestRides(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const calculateNearestRides = (data) => {
    data.forEach((station) => {
      let st_paths = station.station_path.sort();
      let flag = true;
      for (let p of st_paths) {
        if (p > userStation && flag && !visited.includes(p)) {
          station["distance"] = Math.abs(userStation - p);
          visited.push(p);
          flag = false;
          setNearestRides((prev) => [...prev, station]);
        }
      }
    });
  };

  nearestRides.sort(function (a, b) {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });

  filteredResults = nearestRides;

  if (sFilter && sFilter !== "State" && filteredResults !== []) {
    filteredResults = nearestRides.filter((station) => {
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

export default NearestRides;
