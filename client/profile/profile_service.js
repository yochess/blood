app.factory('Profile', function($http) {
  
  let getUser = () => {
    return $http({
      method: 'GET',
      url: '/api/profile',
    })
    .then((resp) => {
      console.log('get response', resp.data);
      return resp.data;
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
        lat:user.lat,
        long:user.lat,
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
