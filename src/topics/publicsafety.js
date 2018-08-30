export default {
  key: 'safetyInfo',
  icon: 'star',
  label: 'Public Safety',
  dataSources: ['policePSA', 'policeDistr'],

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
                return "Not on this block";
              },
            },
          }
        ],
      },
      slots: {
        title: 'Snow Emergency Route',
      }, // end slots
    }, // end of badge-custom
    {
      type: 'callout',
      slots: {
        text: '\
        When snow accumulations approach emergencyt status, the Managing Director \
        may declare a snow emergency. Once emergency is declared, owners of vehicles \
        and dumpsters must move them so City forces can clear snow on the emergency \
        routes. Any vehicle remaining on a Snow Emergency Route will be ticketed and \
        towed. If your car is towed, call 215-686-SNOW for its location. Do NOT call 911. \
        View complete listing of \
        <a href="//www.philadelphiastreets.com/highways/snow/emergency-routes/"> priority \
        streets.</a> Source: Streets Department.\
        '
      }
    },
    {
      type: 'horizontal-table',
      options: {
        fields: [],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'Large-scale evacuations don\'t happen very often in Philadelphia. You\
            can download a printable map for this area';
          },
          name: '',
          href: function(state) {
            // var address = state.geocode.data.properties.street_address;
            // var addressEncoded = encodeURIComponent(address);
            return '//www.phila.gov/media/2015/07/Evacuation-Routes-Map-Book-OEM.pdf';
          }
        }
      },
      slots: {
      }
    }, // end table
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
            label: 'Police Jurisdiction',
            value: function(state) {
              let mail = 'police.co_'+state.geocode.data.properties.police_district+'@phila.gov'
              //bug below, always returns n"th"
              function nth(n) { return n + (["st","nd","rd"][((n+90)%100-10)%10-1]||"th")};
              return (nth(state.geocode.data.properties.police_district) + ' District <br>'
                      +'PSA '+ state.geocode.data.properties.police_service_area
                      +'<br> <a target="_blank"> PSA Leader Email Link</a>'
                      + '<br>(215) '+ state.sources.policeDistr.data[0].properties.PHONE
                      + '<br>' + state.sources.policeDistr.data[0].properties.LOCATION
                      + '<br> <a href="mailto:'+mail+'">'+mail+'</a>');
            },
          },
          {
            label: 'Child Welfare',
            value: function(state) {
              return "Sample Name of Turning Points Location\
                      <br>";
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
