app.factory('BloodMap', function($http) {

  let getmap = (geoobj) => {
    return $http({
      method: 'GET',
      url: '/api/hospital/geo',
       query: 'geoobj'// {H: xd, j: qd}
    })
    .then((res) => {
      return res.data;
    });
  };

  return getmap;

});
