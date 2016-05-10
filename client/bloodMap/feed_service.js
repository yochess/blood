app.factory('Feed', ['$http', function($http) {
  let get = (minLat, minLong, maxLat, maxLong, lastUpdated = 0) => {
    return $http({
      method: 'GET',
      url: '/api/post',
      params: {minLat, minLong, maxLat, maxLong, lastUpdated}
    })
    .then((res) => {
      return res.data;
    });
  };

  return {get};
}]);
