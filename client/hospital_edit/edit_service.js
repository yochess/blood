app.factory('HospitalProfile', function($http) {

  let get = () => {
    return $http({
      method: 'GET',
      url: '/api/hospital/profile',
    })
    .then((res) => {
      return res.data;
    });
  };


  let update = (hospital) => {
    return $http({
      method: 'PUT',
      url: '/api/hospital/profile',
      data: hospital
    })
    .then((resp) => {
      return resp.data;
    });
  };

  return {get, update};
});
