app.factory('HospitalProfile', function($http) {

  let get = (id) => {
    let url = id ? `/api/hospital/profile/${id}` : 'api/hospital/profile';
    return $http({
      method: 'GET',
      url: url
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
