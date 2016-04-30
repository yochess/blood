app.controller('ProfileController', ['$routeParams' , 'Profile', '$rootScope', function($routeParams, Profile, $rootScope) {
  let ProfileCtrl = this;

  let sampleuser =
            {
        uid:0,
        name: 'Donor',
        email: 'Donor@gmail.com',
        photo: 'http://www.who.int/campaigns/world-blood-donor-day/2013/promotional/tshirt_red_logo1.jpg?ua=1',
        address: '944 Market Street, San Francisco, CA 94102',
        lat :'37.783697',
        long: '-122.408966',
        bloodtype: 'O+'
      };
 

  ProfileCtrl.user = {
    uid:'',
    name: '',
    email: '',
    photo:'',
    address:'',
    lat: '',
    long:'',
    bloodtype: ''
  };

  ProfileCtrl.edit = true;
  ProfileCtrl.Edit = function() {
    ProfileCtrl.edit = !ProfileCtrl.edit;
  };

 
  ProfileCtrl.getlatlong = () => {
    let address = document.getElementById('address').value;
    console.log(address);
    // address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    let geocoder = new google.maps.Geocoder();
    if (geocoder) {
    console.log(geocoder);

        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log(results);
              ProfileCtrl.user.lat = results[0].geometry.location.lat();
              ProfileCtrl.user.long = results[0].geometry.location.lng();
            }
        });
    }
};


  ProfileCtrl.updateUser = () => {
    // console.log('updateUser', ProfileCtrl.user);
    // sampleuser.push(ProfileCtrl.user);
    // console.log(sampleuser);
    Profile.updateUser(ProfileCtrl.user)
      .then((profile) => {
        ProfileCtrl.user = profile;
      })
      .catch((error) => {
        console.error(error);
      });
  };


   let displayUser = function () {

    ProfileCtrl.user = sampleuser;
    // Profile.getUser()

    // .then(function (user) {
    //   // ProfileCtrl.user = user;
    //   console.log(ProfileCtrl.user);

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };


  displayUser();
  
}]);