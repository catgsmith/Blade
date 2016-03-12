angular.module("shoppingApp", ["ionic"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
      abstract: true,
      url: "/home",
      templateUrl: "templates/layout.html"
    })

    .state('home.prices', {
      url: "/prices",
      views: {
        "tab-prices": {
          templateUrl: "templates/prices.html"
        }
      }
    })

    .state('home.cart', {
      url: "/cart",
      views: {
        "tab-cart": {
          templateUrl: "templates/cart.html"
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/prices');
});
