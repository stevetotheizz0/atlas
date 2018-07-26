export default {
  key: 'propertyinfo',
  icon: 'home',
  label: 'Property Information',
  dataSources: [
    'propertyinfodata'
  ],

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
              return state.geocode.data.properties.elementary_school ;
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
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'Public Safety',
        fields: [
          {
            label: 'Police District',
            value: function(state) {
              return state.geocode.data.properties.police_district;
            },
          },
          {
            label: 'Police Public Service Area',
            value: function(state) {
              return state.geocode.data.properties.police_service_area;
            },
          },
          {
            label: 'Police Division',
            value: function(state) {
              return state.geocode.data.properties.police_division;
            },
          },
        ]
      }
    }, // end police table
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
      {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'Districts',
        fields: [
          {
            label: 'Planning District',
            value: function(state) {
              return state.geocode.data.properties.planning_district;
            },
          },
          {
            label: 'Licenses and Inspections (L+I)',
            value: function(state) {
              return state.geocode.data.properties.li_district;
            },
          },
          {
            label: 'Census Tract 2010',
            value: function(state) {
              return state.geocode.data.properties.census_tract_2010;
            },
          },
          {
            label: 'Census Block Group 2010',
            value: function(state) {
              return state.geocode.data.properties.census_block_group_2010;
            },
          },
          {
            label: 'Commercial Corridor',
            value: function(state) {
              return state.geocode.data.properties.commercial_corridor;
            },
          },
        ]
      }
    }, // end districts table
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'Streets',
        fields: [
          {
            label: 'Highway District',
            value: function(state) {
              return state.geocode.data.properties.highway_district;
            },
          },
          {
            label: 'Highway Section',
            value: function(state) {
              return state.geocode.data.properties.highway_section;
            },
          },
          {
            label: 'Highway Subsection',
            value: function(state) {
              return state.geocode.data.properties.highway_subsection;
            },
          },
          {
            label: 'Street Light Routes',
            value: function(state) {
              return state.geocode.data.properties.street_light_route;
            },
          },
          {
            label: 'Traffic District',
            value: function(state) {
              return state.geocode.data.properties.traffic_district;
            },
          },
          {
            label: 'Traffic PM District',
            value: function(state) {
              return state.geocode.data.properties.traffic_pm_district;
            },
          },
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
              return  state.geocode.data.properties.recycling_diversion_rate * 100 +'%';
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

  ], // end comps
  basemap: 'pwd',
  dynamicMapLayers: [
    //'zoning'
  ],
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
