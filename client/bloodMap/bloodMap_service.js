app.factory('BloodMap', function($http) {

  let getmap = (geoobj) => {
    return $http({
      method: 'GET',
      url: '/api/hospital/geo',
      params: geoobj// {H: xd, j: qd}
    })
    .then((res) => {  
      return res.data;
    });
  };

  return {getmap};

});
