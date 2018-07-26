import helpers from '../util/helpers';

export default {
  id: 'propertyinfodata',
  type: 'http-get',
  url: '//api.phila.gov/ais/v1/search/',
  options: {
    params: {
      urlAddition: function (feature) {
        return feature.properties.street_address;
      },
      gatekeeperKey: helpers.GATEKEEPER_KEY,
      include_units: true,
      opa_only: false,
      page: 1,
    },
    success: function(data) {
      return data;
    }
  }
}
