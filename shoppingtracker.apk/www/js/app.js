// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MyCtrl', function($scope, $timeout) {

  $scope.items = [
  {name: "Milk (1l)", price: 0.85 }, 
  {name: "Milk (2l)", price: 1.45 },  
  {name: "Sliced Loaf (White)", price: 0.70 }, 
  {name: "Sliced Loaf (Brown)", price: 0.80 },
  {name: "Sliced Loaf (White)", price: 2.05 }]; 

  $scope.total=0;
  $scope.title = "Shopping Calculator";

  $scope.addAmount = function(itemValue) {
    $scope.total += Number(itemValue);
  };

});
