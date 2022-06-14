import React from "react";
import "./RideCard.css";

function RideCard({
  id,
  originStation,
  stationPath,
  date,
  imageLink,
  distance,
  cityName,
  stateName,
}) {
  return (
    <div className="card-container">
      <div className="map-container">
        <img src={imageLink} alt="" />
      </div>
      <div className="ride-details">
        <p className="details">
          RideID: <span>{id}</span>
        </p>
        <p className="details">
          Origin Station: <span>{originStation}</span>
        </p>
        <p className="details">
          station_path: <span>{stationPath}</span>
        </p>
        <p className="details">
          Date: <span>{date}</span>
        </p>
        <p className="details">
          Distance: <span>{distance}</span>
        </p>
      </div>{" "}
      <div className="cityAndState">
        <div className="city">{cityName}</div>
        <div className="state">{stateName}</div>
      </div>
    </div>
  );
}

export default RideCard;

//  RideID: 002
//  Origin Station: 20
//  station_path: [20,30,40,50,60,70,80]
//  Date: 15th Feb 2022 16:33
//  Distance: 0
