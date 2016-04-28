app.controller('ProfileController', ['$routeParams', function($routeParams, Profile) {
  let ProfileCtrl = this;
  ProfileCtrl.user = {
    name: '',
    email: ''
  };

  ProfileCtrl.user = {};

  ProfileCtrl.addUser = () => {
    console.log('addUser');
    Profile.addUser(ProfileCtrl.user)
      .then((profile) => {
        ProfileCtrl.user = profile;
      })
      .catch((error) =>{
        console.error(error);
      });
  };
  
}]);