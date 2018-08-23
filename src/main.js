/*
   _____   __  .__
  /  _  \_/  |_|  | _____    ______
 /  /_\  \   __\  | \__  \  /  ___/
/    |    \  | |  |__/ __ \_\___ \
\____|__  /__| |____(____  /____  >
        \/               \/     \/
*/

import accounting from 'accounting';
import axios from 'axios';
import moment from 'moment';
import mapboard from '@cityofphiladelphia/mapboard';

// General Config Modules
import helpers from './util/helpers';
import map from './general/map';
import transforms from './general/transforms';
import parcels from './general/parcels';
import legendControls from './general/legendControls';
import imageOverlayGroups from './general/imageOverlayGroups';
import greeting from './general/greeting';

// data sources
import threeOneOneCarto from './data-sources/311-carto';
import condoList from './data-sources/condo-list';
import crimeIncidents from './data-sources/crime-incidents';
import divisions from './data-sources/divisions';
import dorCondoList from './data-sources/dor-condo-list';
import dorDocuments from './data-sources/dor-documents';
import elections from './data-sources/elections';
import liBusinessLicenses from './data-sources/li-business-licenses';
import liInspections from './data-sources/li-inspections';
import liPermits from './data-sources/li-permits';
import liViolations from './data-sources/li-violations';
import nearbyZoningAppeals from './data-sources/nearby-zoning-appeals';
import opa from './data-sources/opa';
import rco from './data-sources/rco';
import regmaps from './data-sources/regmaps';
import vacantIndicatorsPoints from './data-sources/vacant-indicator-points';
import zoningAppeals from './data-sources/zoning-appeals';
import zoningBase from './data-sources/zoning-base';
import zoningDocs from './data-sources/zoning-docs';
import zoningOverlay from './data-sources/zoning-overlay';
//import airquality from './data-sources/airquality';
import histDesignated from './data-sources/historic';
import historicNearby from './data-sources/historic-nearby';
import businessArea from './data-sources/business-area';
import keystoneZone from './data-sources/keystone-zone';
import redevelopmentArea from './data-sources/redevelopment-area';
import tobacco from './data-sources/tobacco-free';
import noVendingArea from './data-sources/vending-area';
import specialVendingArea from './data-sources/vending-special';
import neighConservation from './data-sources/neigh-conservation';
import histDistrict from './data-sources/historic-distr';
import watersheds from './data-sources/watersheds';
import floodplain from './data-sources/floodplain'
// unreleased data sources


// Topics
import property from './topics/property';
import condos from './topics/condos';
import deeds from './topics/deeds';
import li from './topics/li';
import zoning from './topics/zoning';
import polling from './topics/polling';
// import rco from './topics/rco';
import nearby from './topics/nearby';
import historic from './topics/historic';
import business from './topics/business';
import schoolInfo from './topics/schoolinfo';
import safetyInfo from './topics/publicsafety';
// import politicalInfo from './topics/political';
import trashDay from './topics/trash';
import environment from './topics/environment';


// styles
// TODO move all styles here (that have a npm package)
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-measure/dist/leaflet-measure.css';
// REVIEW not sure why the hard path is necessary for vector icon
// REVIEW the vector icons seem to be working without this - why?
// import '../node_modules/@cityofphiladelphia/mapboard/node_modules/leaflet-vector-icon/dist/leaflet-vector-icon.css';
// turn off console logging in production
// TODO come up with better way of doing this with webpack + env vars
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

// console.log('data source', dataSources);
// console.log('data source', dataSources);

// var BASE_CONFIG_URL = 'https://cdn.rawgit.com/rbrtmrtn/mapboard-base-config/ef2a0bfcca48e3cb9c8922f27996dd5d543dc2fe/config.js';
var BASE_CONFIG_URL = 'https://raw.githubusercontent.com/ajrothwell/mapboard-base-config/master/config.js';
// configure accounting.js
accounting.settings.currency.precision = 0;

mapboard({
  // DEV
  // defaultAddress: '1234 MARKET ST',
  router: {
    enabled: true
  },
  geolocation: {
    enabled: false
  },
  addressInputLocation: 'map',
  addressInput: {
    autocompleteEnabled: false
  },
  rootStyle: {
    position: 'absolute',
    bottom: 0,
    // top: '78px',
    top: '118px',
    left: 0,
    right: 0,
  },
  gatekeeperKey: helpers.GATEKEEPER_KEY,
  map: {
    featureLayers: {
      streetTrees: {
        url: '//services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/Philadelphia_Street_Trees/FeatureServer/0',
        markerType: 'circleMarker',
        color: 'green',
        interactive: false,
        fillColor: 'green',
        fillOpacity: 0.5,
        weight: 1,
        radius: 6,
        minZoom: 19,
      },
    }
  },
  baseConfig: BASE_CONFIG_URL,
  parcels,
  imageOverlayGroups,
  legendControls,
  cyclomedia: {
    enabled: false,
    measurementAllowed: false,
    popoutAble: true,
  },
  pictometry: {
    enabled: false,
  },
  transforms,
  greeting,
  dataSources: {
    threeOneOneCarto,
    businessArea,
    condoList,
    crimeIncidents,
    divisions,
    dorCondoList,
    dorDocuments,
    // elections,
    floodplain,
    histDesignated,
    histDistrict,
    keystoneZone,
    liBusinessLicenses,
    liInspections,
    liPermits,
    liViolations,
    nearbyZoningAppeals,
    neighConservation,
    noVendingArea,
    opa,
    rco,
    redevelopmentArea,
    regmaps,
    specialVendingArea,
    tobacco,
    vacantIndicatorsPoints,
    watersheds,
    zoningAppeals,
    zoningBase,
    zoningDocs,
    zoningOverlay,
  },
  topics: [
    property,
    condos,
    deeds,
    li,
    zoning,
    // polling,
    // rco,
    business,
    historic,
    environment,
    schoolInfo,
    safetyInfo,
    trashDay,
    // politicalInfo,
    nearby
  ],
  components: [
    {
      type: 'topic-set',
      options: {
        defaultTopic: 'property'
      }
    },
  ],
});
