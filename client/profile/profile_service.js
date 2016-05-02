app.factory('Profile', function($http) {

  let get = () => {
    return $http({
      method: 'GET',
      url: '/api/profile',
    })
    .then((res) => {
      return res.data;
    });
  };


  let update = (user) => {
    console.log(user);
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
    .then((resp) => {
      return resp.data;
    });
  };

  return {get, update};
});
