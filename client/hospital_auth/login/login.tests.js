describe('HospitalAuthController', () => {
  beforeEach(module('blood'));

  describe('HospitalAuthCtrl.signup()', () => {
    it('should set location to edit page on signup', inject(($controller) => {
      let hospitalAuthController = $controller('HospitalAuthController', {
        $window: '',
        HospitalAuthCtrl: ''
      });

      // TODO: do something

    }));
  });
});