app.factory('BloodMap', ['$http', function($http) {

  let getMap = (geoobj) => {
    return $http({
      method: 'GET',
      url: '/api/hospital/geo',
      params: geoobj
    })
    .then((res) => {
      return res.data;
    });
  };

  return {getMap};

}]);
