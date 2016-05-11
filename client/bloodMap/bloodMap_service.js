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
    //console.log(geoobj);
    return $http({
      method: 'GET',
      url: '/api/profile/geo',
      params: geoobj
    })
    .then((res) => {
      console.log('donors',res.data);
      return res.data;
    });
  };

  return {getMap , getDonors};

}]);
