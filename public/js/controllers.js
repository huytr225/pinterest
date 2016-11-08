'use strict';

angular.module('pin')
    .controller('StartCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
        //$rootScope.isLogin = 0;
        $http.get("/pin")
            .then(function(response) {
                $scope.pins = response.data;
            });
        
    }])
    .controller('PinCtrl', ['$scope', '$http', '$rootScope', '$location','$stateParams', 'users', function($scope, $http, $rootScope, $location, $stateParams, users){
        
        $http.get("/pin/"+$stateParams.user)
            .then(function(response) {
                $scope.pins = response.data;
            });
        $scope.addPin = function() {
            users.addPin({
                user : $rootScope.user,
                title: $scope.title,
                url: $scope.url
            }).then(function (data) {
                $location.path('#/pin/'+$stateParams.user);
        });
            
      };
    }])
    .controller('UsersCtrl', ['$rootScope', '$scope', '$http', '$location', 'users', function($rootScope, $scope, $http, $location, users){
        
        $scope.login = function () {
            users.login({
                email: $scope.email,
                password: $scope.password
            }).then(function (data) {
                if(data.data.message == "No user found.") {
                    $scope.messageLogin = "No user found.";
                } else if (data.data.messageLogin == "Wrong password.") {
                    $scope.message = "Wrong password.";
                } else {
                    $rootScope.user = data.data.local.email;
                    $location.path('/');
                };
            })
        }
        
        $scope.register = function () {
            users.register({
                email: $scope.email,
                password: $scope.password
            }).then(function (data) {
                if(data.data.message == "That email is already in use.") {
                    $scope.messageRegister = "That email is already in use.";
                } else {
                    $rootScope.user = data.data.local.email;
                    $scope.begin = "true";
                };
            })
        }
    }]);