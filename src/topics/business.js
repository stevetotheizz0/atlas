export default {
  key: 'business',
  icon: 'briefcase',
  label: 'Business',
  dataSources: ['businessArea', 'redevelopmentArea'],

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
            label: 'Business Improvement District',
            value: function() {
              return ("<a><b>Sample Business District</b></a> <br> \
              1234 Market Street, 19404 <br> \
              (215) 555-0555 <br> \
              sample@phila.gov")
            }
          },
          {
            label: 'Market Area Representative',
            value: function(state) {
              return ('<a href="https://www.phila.gov/commerce/pages/default.aspx" target="_blank"><b> ' + state.sources.businessArea.data[0].properties.MANAGER + '</b></a> <br> \
              Senior Somthing Something<br> \
              (215) 555-0555 <br>')
            }
          },
          {
            label: 'Keystone Opportunity Zone',
            value: function(state) {
              if (state.sources.keystoneZone.data) {
                if (state.sources.keystoneZone.data.length > 0) {
                  return "Eligible" } else {
                  return "Not Eligible"
                }
              } else {
                return "Not Eligible"
              }
            }
          },
          {
            label: 'Redevelopment Certified Area',
            value: function(state) {
              if(state.sources.redevelopmentArea.data){
                if(state.sources.redevelopmentArea.data.length > 0) {
                  var date;
                  if(state.sources.redevelopmentArea.data[0].properties.RECERT4 != null) {
                    date = state.sources.redevelopmentArea.data[0].properties.RECERT4 } else
                  if(state.sources.redevelopmentArea.data[0].properties.RECERT3 != null) {
                    date = state.sources.redevelopmentArea.data[0].properties.RECERT3 } else
                  if(state.sources.redevelopmentArea.data[0].properties.RECERT2 != null) {
                    date = state.sources.redevelopmentArea.data[0].properties.RECERT2 } else
                  if(state.sources.redevelopmentArea.data[0].properties.RECERT1 != null) {
                    date = state.sources.redevelopmentArea.data[0].properties.RECERT1 } else
                  if(state.sources.redevelopmentArea.data[0].properties.YEAR) {
                    date = state.sources.redevelopmentArea.data[0].properties.YEAR } else {
                    date = "Not Applicable"
                  };
                  return ( state.sources.redevelopmentArea.data[0].properties.NAME +"<br>" +
                          date )
                } else {
                  return "Not Applicable"
                }
              } else {
                return "Not Applicable"
              }
            }
          },
          {
            label: 'Tobacco Restrictions',
            value: function(state) {
              if(state.sources.tobacco.data != null) {
                if(state.sources.tobacco.data.length > 0) {
                  return "Tobacco-Free School Zone" } else {
                  return "Eligible - Apply for a permit <a>here</a>"
                }
              } else {
                return "Eligible - Apply for a permit <a>here</a>"
              }
            }
          },
          {
            label: 'Street Vending',
            value: function() {
              return ("Prohibited")
            }
          },
        ]
      }
    }
  ],

  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
