'use strict';

angular.module('pin',[
        'ngResource',
        'ui.router',
        'users',
        'wu.masonry'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('index',{
                url:"/",
                templateUrl:'/views/start.html',
                controller:'StartCtrl'
            })
            .state('login',{
                url:"/login",
                templateUrl:'/views/login.html',
                controller:'UsersCtrl'
            })
            .state('pin',{
                url:"/pin/:me/:user",
                templateUrl:'/views/pin.html',
                controller:'PinCtrl'
            })
    }]);