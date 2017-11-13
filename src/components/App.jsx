import React from 'react';

import { Map } from './Map';
import { RouteSelect } from './RouteSelect';
import Route from '../utils/Route';
import { initializeMap } from '../utils/initMap';

export default class App extends React.Component {
  constructor() {
    super();

    this.getRoutes = this.getRoutes.bind(this);
    this.setSelectedRoutes = this.setSelectedRoutes.bind(this);

    const [svg, projection] = initializeMap();

    this.state = {
      routes: [],
      selectedRoutes: [],
      svg: svg,
      projection: projection
    }

    this.getRoutes();
  };

  setSelectedRoutes(selectedRoutes) {
    this.setState({ selectedRoutes: [selectedRoutes] });
  }

  getRoutes() {
    window.fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni')  // Request the list of routes from the API
    .then(response => response.json())
    .then(({route}) => {
      const routes = route.map(({title, tag}) => new Route(title, tag));  // Create a Route object for each route
      this.setState({ routes: routes });
    });
  };

  render() {
    return (
      <div>
        <Map routes={this.state.routes} selectedRoutes={this.state.selectedRoutes}
          svg={this.state.svg} projection={this.state.projection} />
        <RouteSelect routes={this.state.routes} setSelectedRoutes={this.setSelectedRoutes} />
      </div>
    );
  }
}
