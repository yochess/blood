describe('StockController', () => {

  beforeEach(module('blood'));

    it('should hold blood stock levels', inject(($controller) => {

      let stockController = $controller('StockController', {
        $window: {
          localStorage: localStorage
        }
      });

      expect(stockController.levels).to.exist;
      localStorage.clear();
    }));

    it('should have eight blood types', inject(($controller) => {

      let stockController = $controller('StockController', {
        $window: {
          localStorage: localStorage
        }
      });

      let bloodTypes = [];

      for(key in stockController.levels) {
        bloodTypes.push(key);
      }

      expect(bloodTypes.length).to.equal(8);
      localStorage.clear();
    }));

    it('should select a new blood type and change it', inject(($controller) => {

      let stockController = $controller('StockController', {
        $window: {
          localStorage: localStorage
        }
      });

      stockController.handleClick('oNeg');

      stockController.setTypeLevel();

      expect(stockController.levels['oNeg']).to.equal(0);

      stockController.setLevel = 15;

      stockController.setTypeLevel();

      expect(stockController.levels['oNeg']).to.equal(15);



    }))



});