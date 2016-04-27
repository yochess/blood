//This file demonstrates how basic tests should be set up.
//Use it as a template going forward for basic unit testing.

//Describes the MyController test suite.
describe('MyController', function(){
  //loads the my-module module from the MyController suite.
  beforeEach(module('my-module'));
  //describes the test we will be running
  describe('getFullName()', function(){
    //This looks like a standard test line ,but note the Inject declaration.
    //It injects $controller into the test, which allows resolving registered controllers
    it('should handle names correctly', inject(function($controller){
      //Scopes are just JS objects, so we create a scope here.
      var scope = {};
      //Creates an instance of the controller to use as the test subject
      var myController = $controller('MyController', {
        $scope: scope
      });

      myController.firstName = 'George';
      myController.lastName = 'Harrison';

      myController.getFullName().should.equal('George Harrison');
    }));
  });

  describe('addSong()', function(){
  it('should add songs', inject(function($controller) {
    var scope = {};
    var myController = $controller('MyController', {
      $scope: scope
    });

    scope.addSong('While My Guitar Gently Weeps');

    scope.songs.should.contain('While My Guitar Gently Weeps');
  }));
});

});