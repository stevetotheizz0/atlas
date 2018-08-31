export default {
  id: 'coolWarmSta',
  type: 'esri-nearby',
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/CoolingCenters/FeatureServer/',
  options: {
    geometryServerUrl: '//gis.phila.gov/arcgis/rest/services/Geometry/GeometryServer/',
    calculateDistance: true,
    distances: 10000,
  },
}
