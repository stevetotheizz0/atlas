export default {
  key: 'environment',
  icon: 'leaf',
  label: 'Environment',
  dataSources: ['watersheds'],

  components: [
    {
      type: 'badge-custom',
      options: {
        titleBackground: '#58c04d',
        components: [
          {
            type: 'badge',
            options: {
              titleBackground: '#58c04d',
            },
            slots: {
              value: function() {
                return "Good";
              },
            },
          }
        ],
      },
      slots: {
        title: 'Current Air Quality',
      }, // end slots
    }, // end of badge-custom
    {
      type: 'horizontal-table',
      options: {
        fields: [],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'Last updated 9/9/1999 at 11:11:00 AM';
          },
          name: '',
          href: function(state) {
            // var address = state.geocode.data.properties.street_address;
            // var addressEncoded = encodeURIComponent(address);
            return '//www.phila.gov';
          }
        }
      },
      slots: {
      }
    }, // end table
    {
      type: 'vertical-table',

      slots: {
        title: 'Environmental Hazards and Resources',
        fields: [
          {
            label: 'Water at this address drains into:',
            value: function(state) {
              return state.sources.watersheds.data[0].properties.WATERSHED_NAME
            }
          },
          {
            label: 'Lot Impervious Cover',
            value: function() {
              return "85%"
            }
          },
          {
            label: 'Flood Risk',
            value: function(state) {
              if (state.sources.floodplain.data.length > 0) {
                return "Within 100-year floodplain."
              } else {
              return "Not in 100-year floodplain.";
              }
            }
          },
        ]
      },
    },
    {
      type: 'callout',
      slots: {
        text: "\
        Park Friends groups are volunteer-run community groups dedicated to the care of their\
        park. They organize clean-ups, hold nature walks, festivals, and other events. Contact\
        your park's friends group for more information, to report a concern, or to get involved.\
        "
      }
    },
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd',
  featureLayers: [
    'streetTrees'
  ],
};
