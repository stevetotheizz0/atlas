export default {
  key: 'business',
  icon: 'briefcase',
  label: 'Business',
  dataSources: [],

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
            value: function() {
              return ("<a><b>Joey McJoeJoe</b></a> <br> \
              Senior Somthing Something<br> \
              (215) 555-0555 <br>")
            }
          },
          {
            label: 'Keystone Opportunity Zone',
            value: function() {
              return ("Not eligible")
            }
          },
          {
            label: 'Blight Redevelopment Zone',
            value: function() {
              return ("Not eligible")
            }
          },
          {
            label: 'Tobacco-Free School Zone',
            value: function() {
              return ("Eligible - Apply for a permit <a>here</a>")
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
