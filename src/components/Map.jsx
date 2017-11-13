import React from 'react';

// **********************************
// ***** Bus Location Functions *****
// **********************************
const startUpdating = (routes, selectedRoutes, svg, projection) => {
  // Called when each interval expires to update the vehicle's locations:
  const updateVehicleLocations = () => {
    const timeOfLastInterval = getTimeOfLastInterval();
    getLocations(timeOfLastInterval)
    .then(locations => locations.forEach(addVehicleToMap));
  }

  // Get the locations of the vehicles on the selected routes:
  const getLocations = (previousTime) => {
    const selectedRouteObjects = routes.filter(route => selectedRoutes.includes(route.tag));
    return Promise.all(selectedRouteObjects.map(route => route.getVehicleLocations(previousTime)));
  }

  // Add a vehicle to the Map at its present location:
  const addVehicleToMap = ({route, vehicles}) => {
    svg.selectAll('path')
      .data(vehicles)
      .enter()
        .append('circle')
          .attr('cx', d => projection(d)[0])
          .attr('cy', d => projection(d)[1])
          .attr('r', 25)
          .attr('fill', 'red');
  }

  // Get the time when we last checked the locations:
  const getTimeOfLastInterval = () => new Date().getTime() - this.intervalPeriod;

  const intervalPeriod = 5000;
  // const intervalPeriod = 15000;  // 15 seconds
  window.setInterval(updateVehicleLocations, intervalPeriod);
};

// *************************
// ***** Map Component *****
// *************************
export const Map = ({routes, selectedRoutes, svg, projection}) => {
  // Start updating the locations of the busses:
  startUpdating(routes, selectedRoutes, svg, projection);

  // Return an empty div:
  return <div></div>;
}
