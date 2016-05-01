app.factory('Profile', function($http) {

  let getUser = () => {
    return $http({
      method: 'GET',
      url: '/api/profile',
    })
    .then((res) => {
      return res.data;
    });
  };


  let updateUser = (user) => {
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

  return {
    getUser,
    updateUser
  };
});
