export default {
  key: 'schoolInfo',
  icon: 'school',
  label: 'Schools',

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
        title: 'School Catchment',
        fields: [
          {
            label: 'Elementary School',
            value: function(state) {
              return state.geocode.data.properties.elementary_school;
            },
          },
          {
            label: 'Middle School',
            value: function(state) {
              return state.geocode.data.properties.middle_school;
            },
          },
          {
            label: 'High School',
            value: function(state) {
              return state.geocode.data.properties.high_school;
            },
          },
        ]
      }
    }, // end schgools table
  ], // end comps

  basemap: 'pwd',
  dynamicMapLayers: [
    //'zoning'
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
