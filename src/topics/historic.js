export default {
  key: 'historic',
  icon: 'archway',
  label: 'Historic',
  dataSources: ['hist_designated', 'crimeIncidents'],

  components: [
    {
      type: 'callout',
      slots: {
        text: 'Condominium units at your search address, as recorded for property assessment purposes. Click one of the addresses below to see information for that unit.  Use the back button to return to this list. Source: Office of Property Assessment'
      }
    },
    {
      type: 'vertical-table',
      slots: {
        fields: [
          {
            label: 'Historic District',
            value: function(state) {
              if (state.sources.hist_designated.data[0].properties.DDESIGDATE) {
                return state.sources.hist_designated.data[0].properties.DDESIGDATE;
              } else {
                return "No date available."
              }
            }
          },
          {
            label: 'Historic Street',
            value: function() {
              return ("Type of Street or No")
            }
          },
          {
            label: 'Building Age',
            value: function(state) {
              return state.sources.opa.data.year_built + " (estimated)";
            }
          },
          {
            label: 'Building Description',
            value: function(state) {
              return state.sources.opa.data.building_code_description;
            }
          },
          {
            label: 'Historic District',
            value: function() {
              return "Yes / No "
            }
          },
          {
            label: 'Conservation District',
            value: function() {
              return ("District Name <br> \
                      Designation Date <br> \
                      <a>Link to Info</a>");
            }
          },
        ]
      }
    },
    {
      type: 'horizontal-table',
      options: {
        shouldShowHeaders: true,
        fields: [
          {
            label: 'Historic District',
            value: function(state, item) {
              if (item.properties.DISTRICT) {
                return item.properties.DISTRICT;
              } else {
                return "No District Name"
              }
            },
          },
          {
            label: 'Designation Date',
            value: function(state, item) {
              if (item.properties.DDESIGDATE) {
                return item.properties.DDESIGDATE;
              } else {
                return "Date not available."
              }

            },
          },
          ],
      },
      slots: {
        title : 'Historic District Overlays',
        items: function(state) {
          var data = state.sources['hist_designated'].data;
          var rows = data.map(function(row){
            var itemRow = row;
            return itemRow;
          });
          return rows;
        },
      } // end slots
    }, // end table

    {
      type: 'horizontal-table-group',
      options: {
        filters: [
          {
            type: 'data',
            getValue: function(item) {
              return item;
            },
            label: 'What nearby activity would you like to see?',
            values: [
              {
                label: '311 Requests',
                value: '311',
              },
              {
                label: 'Crime Incidents',
                value: 'crimeIncidents',
              },
              {
                label: 'Zoning Appeals',
                value: 'nearbyZoningAppeals',
              },
              {
                label: 'Vacant Properties',
                value: 'vacantIndicatorsPoints',
              }
            ]
          },
        ],
        // components for the content pane.
        tables: [
          {
            type: 'horizontal-table',
            options: {
              id: 'crimeIncidents',
              sort: {
                select: true,
                sortFields: [
                  'distance',
                  'date',
                ],
                getValue: function(item, sortField) {
                  var val;
                  if (sortField === 'date' || !sortField) {
                    val = item.dispatch_date;
                  } else if (sortField === 'distance') {
                    val = item.distance;
                  }
                  return val;
                },
                order: function(sortField) {
                  var val;
                  if (sortField === 'date') {
                    val = 'desc';
                  } else {
                    val = 'asc';
                  }
                  return val;
                },
              },
              filters: [
                {
                  type: 'time',
                  getValue: function(item) {
                    return item.dispatch_date;
                  },
                  label: 'From the last',
                  values: [
                    {
                      label: '30 days',
                      value: '30',
                      unit: 'days',
                      direction: 'subtract',
                    },
                    {
                      label: '90 days',
                      value: '90',
                      unit: 'days',
                      direction: 'subtract',
                    },
                  ]
                }
              ],
              filterByText: {
                label: 'Filter by',
                fields: [
                  'text_general_code',
                ]
              },
              mapOverlay: {
                marker: 'circle',
                style: {
                  radius: 6,
                  fillColor: '#6674df',
                  color: '#6674df',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 1.0
                },
                hoverStyle: {
                  radius: 6,
                  fillColor: 'yellow',
                  color: '#6674df',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 1.0
                }
              },
              fields: [
                {
                  label: 'Date',
                  value: function(state, item) {
                    return item.dispatch_date;
                  },
                  nullValue: 'no date available',
                  transforms: [
                    'date'
                  ]
                },
                {
                  label: 'Location',
                  value: function(state, item) {
                    return item.location_block;
                  }
                },
                {
                  label: 'Description',
                  value: function(state, item) {
                    return item.text_general_code;
                  }
                },
                {
                  label: 'Distance',
                  value: function(state, item) {
                    return parseInt(item.distance) + ' ft';
                  }
                }
              ]
            },
            slots: {
              title: 'Crime Incidents',
              data: 'crimeIncidents',
              items: function(state) {
                var data = state.sources['crimeIncidents'].data || [];
                var rows = data.map(function(row){
                  var itemRow = row;
                  // var itemRow = Object.assign({}, row);
                  return itemRow;
                });
                return rows;
              },
            } // end of slots
          }, // end of horizontal-table
        ]
      }
    }

  ],

  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
