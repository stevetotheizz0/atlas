export default {
  key: 'recreation',
  icon: 'baseball-ball',
  label: 'Recreation',
  dataSources: ['libraries'],

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
        fields: [
          {
            label: 'Nearby Library',
            value: function(state) {
              let min = Math.min.apply(null, state.sources.libraries.data.map(function(item) {return item._distance;}));
              let result  = state.sources.libraries.data.filter(function(item){return item._distance == min;} );
              let nearest = result? result[0] : null;

              return nearest.properties.Branch + " Branch"
                     + '<br>' + nearest.properties.Street_Address
                     + '<br> (215) 555-5555'
                     + '<br> Distance: ' + (min/5280).toFixed(1) + ' miles'
                     + '<br> <a href="https://know.freelibrary.org/MyResearch/register">Get a library card</a>';
            },
          },
        ]
      }
    }, // end streets table
    {
      type: 'callout',
      slots: {
        text: '\
          <a href="https://www.rideindego.com/faq/" target="_blank">Indego</a> is Philly\'s public bikeshare. \
          There are now hundreds of self-service bikes and more than 100 stations. The city offers \
          <a href="https://www.rideindego.com/how-it-works/education-classes/" target="_blank">free bike safety \
           classes</a> for adults and teens 14 and older.\
        '
      }
    },
    {
      type: 'horizontal-table',
      options: {
        topicKey: 'bikeshare',
        id: 'bikeshare',
        // limit: 100,
        sort: {
          // this should return the val to sort on
          getValue: function(item) {
            return item.distance;
          },
          // asc or desc
          order: 'asc'
        },
        fields: [
          {
            label: 'Station',
            value: function (state, item) {
              return item.properties.Name
            }
          },
          {
            label: '# of Docks',
            value: function (state, item) {
              return item.properties.Docks
            }
          },
          {
            label: 'Distance',
            value: function(state, item) {
              return parseInt(item._distance) + ' ft';
            }
          }
        ],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'View a map of all Indego stations with current availability.';
          },
          name: '',
          href: function(state) {
            return '//www.rideindego.com/stations/';
          }
        }
      },
      slots: {
        title: 'Nearby Indigo Stations',
        data: 'friendsGroup',
        items: function(state) {
          var data = state.sources['bikeshare'].data || [];
          var rows = data.map(function(row){
            var itemRow = row;
            // var itemRow = Object.assign({}, row);
            return itemRow;
          });
          return rows;
        },
      }, // end of slots
    },
    {
      type: 'horizontal-table',
      options: {
        fields: [],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'Find more parks and recreation facilities citywide';
          },
          name: '',
          href: function(state) {
            // var address = state.geocode.data.properties.street_address;
            // var addressEncoded = encodeURIComponent(address);
            return '//www.phila.gov/parks-rec-finder/#/locations';
          }
        }
      },
      slots: {
      }
    }, // end table
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
