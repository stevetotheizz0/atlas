export default {
  key: 'politicalinfo',
  icon: 'gavel',
  label: 'Political Boundaries',

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
        title: 'Political Boundaries',
        fields: [
          {
            label: 'Councilmanic District',
            value: function(state) {
              return state.geocode.data.properties.council_district_2016;
            },
          },
          {
            label: 'Ward',
            value: function(state) {
              return state.geocode.data.properties.political_ward;
            },
          },
          {
            label: 'Ward Division',
            value: function(state) {
              return state.geocode.data.properties.political_division;
            },
          },
        ]
      }
    }, // end political table
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd',
}
