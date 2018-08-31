export default {
  key: 'safety',
  icon: 'star',
  label: 'Public Safety',
  dataSources: ['policePSA', 'policeDistr', 'fireStation'],

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
              function nth(n){return n + ([,'st','nd','rd'][n%100>>3^1&&n%10]||'th')};
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
              return '<a target="_blank">Sample Name of Location</a>\
                      <br>1234 Sample Address St, 19104\
                      <br>(215) 555-5555\
                      <br>To report child abuse or neglect call (215) 683-6100';
            },
          },
        ]
      }
    }, // end police table
    {
      type: 'horizontal-table',
      options: {
        noCount: true,
        limit: 3,
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
              if (item.properties.ENG){
                if(item.properties.LAD > 0) {
                  return 'Engine '+ item.properties.ENG
                         +' / Ladder '+ item.properties.LAD;
                } else {
                  return 'Engine '+ item.properties.ENG
                }
              } else {
                if (item.properties.LAD > 0) {
                  return 'Ladder '+ item.properties.LAD;
                }
              }
            }
          },
          {
            label: 'Location',
            value: function(state, item) {
              function titleCase(str) {
                str = str.toLowerCase().split(' ').map(function(word) {
                  return (word.charAt(0).toUpperCase() + word.slice(1));
                });
                return str.join(' ');
              }
              return titleCase(item.properties.LOCATION);
            }
          },
          {
            label: 'Distance',
            value: function(state, item) {
              return (item._distance/5280).toFixed(1) + ' miles';
            }
          },
        ],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'View all fire stations citywide';
          },
          name: '',
          href: function(state) {
            return '//www.phila.gov/services/safety-emergency-preparedness/fire-safety/find-a-fire-station/';
          }
        }
      },
      slots: {
        title: 'Nearby Fire Stations',
        data: 'fireStation',
        items: function(state) {
          var data = state.sources['fireStation'].data || [];
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
            label: 'Location',
            value: function(state, item) {
              function titleCase(str) {
                str = str.toLowerCase().split(' ').map(function(word) {
                  return (word.charAt(0).toUpperCase() + word.slice(1));
                });
                return str.join(' ');
              }
              return titleCase(item.properties.Address);
            }
          },
          {
            label: 'Contact',
            value: function (state, item) {
              return item.properties.Number
            }
          },
          {
            label: 'Hours',
            value: function (state, item) {
              return item.properties.Hours
            }
          },
          {
            label: 'Distance',
            value: function(state, item) {
              return (item._distance/5280).toFixed(1) + ' miles';
            }
          },
        ],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'View a map of all cooling and warming centers citywide';
          },
          name: '',
          href: function(state) {
            return '//phl.maps.arcgis.com/apps/webappviewer/index.html?id=0afe8e198cd84da6a51ca4af027a7056';
          }
        }
      },
      slots: {
        title: 'Nearby Cooling and Warming Centers',
        data: 'fireStation',
        items: function(state) {
          var data = state.sources['coolWarmSta'].data || [];
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
      // REVIEW: This area is still in work.
      topicKey: 'safety',
      id: 'trafficDetours',
      options: {
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
            label: 'Location',
            value: function(state, item) {
              function titleCase(str) {
                str = str.toLowerCase().split(' ').map(function(word) {
                  return (word.charAt(0).toUpperCase() + word.slice(1));
                });
                return str.join(' ');
              }
              return titleCase(item.properties.Address);
            }
          },
          {
            label: 'Contact',
            value: function (state, item) {
              return item.properties.Number
            }
          },
          {
            label: 'Hours',
            value: function (state, item) {
              return item.properties.Hours
            }
          },
          {
            label: 'Distance',
            value: function(state, item) {
              return (item._distance/5280).toFixed(1) + ' miles';
            }
          },
        ],
        externalLink: {
          forceShow: true,
          action: function() {
            return 'See citywide traffic alerts from the Philadelphia Police Dept';
          },
          name: '',
          href: function(state) {
            return '//pr.phillypolice.com/category/traffic-alerts/';
          }
        }
      },
      slots: {
        title: 'Upcoming Traffic Detours',
        data: 'fireStation',
        items: function(state) {
          var data = state.sources['coolWarmSta'].data || [];
          var rows = data.map(function(row){
            var itemRow = row;
            // var itemRow = Object.assign({}, row);
            return itemRow;
          });
          return rows;
        },
      }, // end of slots
    },
  ], // end comps
  basemap: 'pwd',
  dynamicMapLayers: [
    //'zoning'
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
