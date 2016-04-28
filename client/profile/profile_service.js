app.factory('Profile', ($http) => {
  //Just Post for profile

  let getUser = () => {
    return $http({
      method: 'GET',
      url: '/api/profile'
    })
    .then((resp) => {
      console.log('get response' ,resp.data);
      return resp.data;
    });
  };

  let addUser = (user) => {
    return $http({
      method: 'POST',
      url: '/api/profile',
      data: {
        name: user.name,
        email: user.email
      }
    })
    .then((resp) =>{
      return resp.data;
    });
  };

  return {
    get: getUser,
    addUser: addUser
  };
});
