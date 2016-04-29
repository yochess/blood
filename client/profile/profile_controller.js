app.controller('ProfileController', ['$routeParams' , 'Profile', function($routeParams, Profile) {
  let ProfileCtrl = this;
  ProfileCtrl.user = {
    name: '',
    email: '',
    group: ''
  };

  ProfileCtrl.addUser = () => {
    console.log('addUser', ProfileCtrl.user);
    Profile.addUser(ProfileCtrl.user)
      .then((profile) => {
        ProfileCtrl.user = profile;
      })
      .catch((error) =>{
        console.error(error);
      });
  };
  
}]);