import React from 'react';

export const RouteSelect = ({routes, setSelectedRoutes}) => (
  <select multiple onChange={event => setSelectedRoutes(event.target.value)}>
    {routes.map((route, index) => (
      <option key={index} value={route.tag}>
        {route.name}
      </option>
    ))}
  </select>
);
