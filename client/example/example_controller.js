(function(){
  angular.module('my-module', [])
    .controller('MyController', [
      '$scope',
      function($scope){
        let self = this;

        self.firstName = '';
        self.lastName = '';

        self.getFullName = () => {
          return self.firstName + ' ' + self.lastName;
        };

        $scope.songs = [
        'Here Comes The Sun'
        ];

        $scope.addSong = (song) => {
          $scope.songs.push(song);
        };

        return self;
      }
  ]);
})();