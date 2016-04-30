app.controller('StockController', ['$routeParams', function($routeParams) {
  let StockCtrl = this;

  StockCtrl.levels = {
    oPos: 4,
    oNeg: 5,
    aPos: 15,
    aNeg: 19,
    bPos: 8,
    bNeg: 7,
    abPos: 10,
    abNeg: 12
  }

  StockCtrl.setLevel = 0;

  StockCtrl.currentSelectedType = 'oPos';

  StockCtrl.yAxis = 'Amount';
  StockCtrl.xAxis = 'Types';

  StockCtrl.maxType = 'oPos';
  StockCtrl.max = 0;

  StockCtrl.handleClick = (keyName) => {
    StockCtrl.currentSelectedType = keyName;
  }

  for (key in StockCtrl.levels ) {
    if (StockCtrl.levels[key] > StockCtrl.max) {
      StockCtrl.max = StockCtrl.levels[key];
    }
  }

  StockCtrl.setTypeLevel = (type) => {
    StockCtrl.levels[StockCtrl.currentSelectedType] = StockCtrl.setLevel;

    //Reset max if the previous max is the same blood type as the one being changed.
    if ( StockCtrl.maxType === StockCtrl.currentSelectedType ) {
      StockCtrl.max = StockCtrl.levels[StockCtrl.currentSelectedType];
    }
    
    //Then see which type is the new maximum.
    for (key in StockCtrl.levels ) {
      if (StockCtrl.levels[key] > StockCtrl.max) {
        StockCtrl.max = StockCtrl.levels[key];
      }
    }
  }
}]);


