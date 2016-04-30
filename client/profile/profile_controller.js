app.controller('ProfileController', ['$routeParams' , 'Profile', '$rootScope', function($routeParams, Profile, $rootScope) {
  let ProfileCtrl = this;

  let sampleuser =[ 
            {
        id:0,
        name: 'Donor',
        email: 'Donor@gmail.com',
        location: 'HackReactor, Sanfransisco',
        group: 'O+'
      }
  ];

  ProfileCtrl.user = {
    id:'',
    name: '',
    email: '',
    location: '',
    group: ''
  };

  ProfileCtrl.Edit = true;
    ProfileCtrl.Edit = function() {
        ProfileCtrl.Edit = !ProfileCtrl.Edit;
    };
 

  ProfileCtrl.updateUser = () => {
    console.log('updateUser', ProfileCtrl.user);
    sampleuser.push(ProfileCtrl.user);
    console.log(sampleuser);
    // Profile.addUser(ProfileCtrl.user)
    //   .then((profile) => {
    //     ProfileCtrl.user = profile;
    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
  };


   let displayUser = function () {

    $rootScope.displayuser = {};
    // console.log(sampleuser[0]);

    $rootScope.displayuser = sampleuser[0];
    console.log($rootScope.displayuser);

    // Profile.getUser($rootScope.displayuser.id)
    // .then(function (user) {
    //   ProfileCtrl.displayuser = user[0];
    //   console.log();

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  displayUser();
  
}]);