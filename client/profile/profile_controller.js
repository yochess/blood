app.controller('ProfileController',(Profile) => {

  let ProfileCtrl = this;
  // ProfileCtrl.user = {
  //   name: '',
  //   email: ''
  // };

  ProfileCtrl.addUser = () => {
    Profile.addUser(ProfileCtrl.user)
      .then((profile) => {
        ProfileCtrl.user = profile;
      })
      .catch((error) =>{
        console.error(error);
      });
  };


});