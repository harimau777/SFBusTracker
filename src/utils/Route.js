export default class Route {
  constructor(name, tag) {
    this.name = name;
    this.tag = tag;
  }

  // Get the locations of the vehicles on this route:
  getVehicleLocations(previousTime) {
    const url = `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${this.tag}&t=${previousTime}`;
    return window.fetch(url)
    .then(response => response.json())
    .then(({vehicle}) => {
      return {route: this.name, vehicles: this.parseLocations(vehicle)};
    });
  }

  // Extract the latitude and longitude for each vehicle from the API's response:
  parseLocations(response) {
    return response.map(({lat, lon}) => {
      return {lat: lat, lng: lon};
    });
  }
}
