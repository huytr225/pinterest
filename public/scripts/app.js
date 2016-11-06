'use strict';

angular.module('pinterest',[
        'ngResource',
        'ui.router',
        'pollServices'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('index',{
                url:"/",
                templateUrl:'/views/index.html',
                controller:''
            })
    }]);