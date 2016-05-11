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

  let getDonors = (geoobj) => {
    return $http({
      method: 'GET',
      url: '/api/donor/geo',
      params: geoobj
    })
    .then((res) => {
      return res.data;
    });
  };

  return {getMap , getDonors};

}]);
