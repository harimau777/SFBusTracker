const d3 = window.d3;
const _ = window._;

export const initializeMap = () => {
  // Append an SVG to the DOM which will contain the map:
  const appendSVG = () => {
    const svg = d3.select('body')  // Append a svg to the HTML body and set its height and width
      .append('svg')
        .attr('height', 500)
        .attr('width', 500);

    const g = svg.append('g');  // Append the <g> element which is used for grouping SVGs

    return [svg, g];
  };

  // Setup the projection used to convert latitude and longitude to coordinates on the map:
  const sanFranciscoCoordinates = [-122.4194, 37.7749];
  const setupProjection = () => d3.geoMercator()
    .scale(200000)
    .center(sanFranciscoCoordinates);

  // Render the map:
  const renderMap = () => {
    getMapData()
    .then((data) => {
      g.selectAll('path')
        .data(data)
        .enter()
          .append('path')
          .attr('d', path);
    });
  }

  // Load the map data from several GeoJSON files:
  const getMapData = () => Promise.all([
      loadJSONData('./sfmaps/arteries.json'),
      loadJSONData('./sfmaps/freeways.json'),
      // Neighborhoods are currently skipped since they cover up all of the rest of the data:
      // loadJSONData('./sfmaps/neighborhoods.json'),
      loadJSONData('./sfmaps/streets.json')
    ])
    .then(data => _.flatten(data));

  // Load a JSON file into D3:
  const loadJSONData = (filePath) => new Promise((resolve, reject) => d3.json(filePath, (error, data) => resolve(data.features)));

  const [svg, g] = appendSVG();
  const projection = setupProjection();
  const path = d3.geoPath()  // Create a geographic path generator and set its projection:
    .projection(projection);
  renderMap();

  // Return the SVG and projection since these will be used when updating vehicle locations:
  return [svg, projection];
}
