app.factory('BloodMap', function($http) {

  let getMap = (geoobj) => {
    console.log('service geoobj', geoobj);
    return $http({
      method: 'GET',
      url: '/api/hospital/geo',
      params: geoobj// {H: xd, j: qd}
    })
    .then((res) => {  
    console.log(res.data);
    
      return res.data;
    });
  };

  return {getMap};

});
