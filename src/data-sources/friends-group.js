export default {
  id: 'friendsGroup',
  type: 'http-get-nearby',
  url: 'https://phl.carto.com/api/v2/sql',
  options: {
    table: 'ppr_friends_addr_webonly',
    params: {},
    distances: 1320,
  }
}
