export default {
  key: 'safetyinfo',
  icon: 'star',
  label: 'Public Safety',

  components: [
    {
      type: 'callout',
      slots: {
        text: '\
          School Catchment Areas, Political Divisions and Districts, Public Safety, Planning Districts, \
          Census Geographies,  Streets and Sanitation information at your search address. \
          Sources: \
        '
      }
    },
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'Public Safety',
        fields: [
          {
            label: 'Police District',
            value: function(state) {
              return state.geocode.data.properties.police_district;
            },
          },
          {
            label: 'Police Public Service Area',
            value: function(state) {
              return state.geocode.data.properties.police_service_area;
            },
          },
          {
            label: 'Police Division',
            value: function(state) {
              return state.geocode.data.properties.police_division;
            },
          },
        ]
      }
    }, // end police table
  ], // end comps
  basemap: 'pwd',
  dynamicMapLayers: [
    //'zoning'
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
