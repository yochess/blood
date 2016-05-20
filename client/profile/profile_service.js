app.factory('Profile', ['$http', function($http) {

  let get = (id) => {
    let url = id ? `/api/profile/${id}` : 'api/profile';
    return $http({
      method: 'GET',
      url: url
    })
    .then((res) => {
      return res.data;
    })
    .catch(err => console.log(err));
  };


  let update = (user) => {
    return $http({
      method: 'PUT',
      url: '/api/profile',
      data: {
        name: user.name,
        email: user.email,
        photo:user.photo,
        address:user.address,
        latitude:user.latitude,
        longitude:user.longitude,
        bloodtype: user.bloodtype
      }
    })
    .then((res) => {
      return res.data;
    });
  };

  return {get, update};
}]);
