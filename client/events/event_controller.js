app.controller('EventController', ['$routeParams', 'Event', 'event', function($routeParams, Event, event) {
  let EventCtrl = this;

  EventCtrl.event = event;

  let getEvent = () => {
    Event.get($routeParams.eventId)
    .then(event => {
      EventCtrl.event = event;
    console.log(event);
  });
  };

  EventCtrl.join = () => {
    Event.join($routeParams.eventId)
    .then(getEvent);
  };
}]);
