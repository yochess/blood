describe('NavController', () => {
  beforeEach(module('blood'));

  // describe('NavCtrl.logInOrOut()', () => {
  //   it('should log the user in when the user is logged out', inject(($controller) => {
  //     localStorage.setItem('id', '');
  //     localStorage.setItem('type', '');

  //     let navController = $controller('NavController', {
  //       $window: {
  //         localStorage: localStorage
  //       }
  //     });

  //     navController.logInOrOut();
  //     localStorage.getItem('id').should.equal('something');
  //     localStorage.clear();
  //   }));

  //   it('should log the user out when the user is logged in', inject(($controller) => {
  //     localStorage.setItem('id', 'something');
  //     localStorage.setItem('type', 'something');

  //     let navController = $controller('NavController', {
  //       $window: {
  //         localStorage: localStorage
  //       }
  //     });

  //     navController.logInOrOut();
  //     expect(localStorage.getItem('id')).to.have.length(0);
  //     localStorage.clear();      
  //   }));
  // });
});
