describe('HospitalAuthController', () => {
  beforeEach(module('blood'));

  describe('HospitalAuthCtrl.login()', () => {
    it('should set location to edit page on success', inject(($controller) => {
      let hospitalAuthController = $controller('HospitalAuthController', {
        $window: '',
        HospitalAuthCtrl: ''
      });

      // TODO: test that location is edit page
    }));

    it('should not set location to edit page on failure', inject(($controller) => {
      let hospitalAuthController = $controller('HospitalAuthController', {
        $window: '',
        HospitalAuthCtrl: ''
      });

      // TODO: test that location is not edit page
    }));
    
  });
});