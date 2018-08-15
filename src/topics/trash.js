export default {
  key: 'trashday',
  icon: 'trash-alt',
  label: 'Trash & Recycling',

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
        title: 'Trash and Recycling',
        fields: [
          {
            label: 'Trash and Recycling Day',
            value: function(state) {
              return state.geocode.data.properties.rubbish_recycle_day;
            },
            transforms: [
              'dayofweek'
            ]
          },
          {
            label: 'Leaf Collection Area',
            value: function(state) {
              return state.geocode.data.properties.leaf_collection_area;
            },
          },
          {
            label: 'Recycling Diversion Rate',
            value: function(state) {
              return  (state.geocode.data.properties.recycling_diversion_rate * 100).toFixed(1) +'%';
            },
          },
          {
            label: 'Sanitation Area',
            value: function(state) {
              return state.geocode.data.properties.sanitation_area;
            },
          },
          {
            label: 'Sanitation District',
            value: function(state) {
              return state.geocode.data.properties.sanitation_district;
            },
          },
        ]
      }
    }, // end streets table
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
