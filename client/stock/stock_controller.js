app.controller('StockController', ['$routeParams', '$http', function($routeParams, $http) {
  let StockCtrl = this;

  StockCtrl.levels = {
    opos: 1,
    oneg: 1,
    apos: 1,
    aneg: 1,
    bpos: 1,
    bneg: 1,
    abpos: 1,
    abneg: 1
  }

  StockCtrl.rename = {
    opos: 'O Pos',
    oneg: 'O Neg',
    apos: 'A Pos',
    aneg: 'A Neg',
    bpos: 'B Pos',
    bneg: 'B Neg',
    abpos: 'AB Pos',
    abneg: 'AB Neg'
  }

  StockCtrl.setLevel = 0;

  StockCtrl.currentSelectedType = 'opos';

  StockCtrl.yAxis = 'Amount';
  StockCtrl.xAxis = 'Types';

  StockCtrl.maxType = 'opos';
  StockCtrl.max = 0;

   StockCtrl.get = () => {
    return $http({
      method: 'GET',
      url: '/api/hospital/profile',
    })
    .then((res) => {
      for(key in res.data){
        if(StockCtrl.levels[key]){
          StockCtrl.levels[key] = res.data[key];
        }
        if (StockCtrl.levels[key] > StockCtrl.max ){
          StockCtrl.max = StockCtrl.levels[key];
        }
      }
      return res.data;
    });
  };

  StockCtrl.put = (data) => {
    return $http({
      method: 'PUT',
      url: '/api/hospital/profile',
      data: data
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  };

  StockCtrl.get = () => {
    return $http({
      method: 'GET',
      url: '/api/hospital/profile',
    })
    .then((res) => {
      for(key in res.data){
        if(StockCtrl.levels[key]){
          StockCtrl.levels[key] = res.data[key];
        }
        if (StockCtrl.levels[key] > StockCtrl.max ){
          StockCtrl.max = StockCtrl.levels[key];
        }
      }
      console.log(res.data);
      return res.data;
    });
  };

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
    let saveData = {
    }
    saveData[StockCtrl.currentSelectedType] = parseInt(StockCtrl.setLevel);
    console.log(saveData);
    StockCtrl.put(saveData);
  }

  StockCtrl.get();

}]);


