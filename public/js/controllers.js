'use strict';

angular.module('pin')
    .controller('StartCtrl', ['$scope', '$http', '$rootScope', 'users', function($scope, $http, $rootScope, users){
        if($rootScope.user == undefined) $rootScope.user = false;
        var listLike = [];
        $http.get("/pin/"+$rootScope.user+"/all")
            .then(function(response) {
                $scope.pins = response.data;
            });
        $scope.likeOrUnlike = function(x){
            if($scope.pins[x].isLike == true) {
                $scope.pins[x].isLike = false;
                $scope.pins[x].numLike--;
                users.unlike({
                    me: $rootScope.user,
                    user : $scope.pins[x].user,
                    title: $scope.pins[x].title
                }).then(function (data) {
                //   console.log(data);
                });
            } else {
                $scope.pins[x].isLike = true;
                $scope.pins[x].numLike++;
                users.like({
                    me: $rootScope.user,
                    user : $scope.pins[x].user,
                    title: $scope.pins[x].title
                }).then(function (data) {
                //   console.log(data);
                });
            }
        }
        
        
    }])
    .controller('PinCtrl', ['$scope', '$http', '$rootScope', '$location','$stateParams', '$state', 'users', function($scope, $http, $rootScope, $location, $stateParams, $state, users){
        $scope.currentUser = $stateParams.user;
        
        $scope.openImg = function(x){
            $scope.image = {
                url : $scope.pins[x].url,
                title: $scope.pins[x].title
            };
            $scope.openimage= {
                "display": "block"
            }
        }
        $scope.closeImg = function(x){
            $scope.openimage= {
                "display": "none"
            }
        }
        $scope.likeOrUnlike = function(x){
            if($scope.pins[x].isLike == true) {
                $scope.pins[x].isLike = false;
                $scope.pins[x].numLike--;
                users.unlike({
                    me: $rootScope.user,
                    user : $stateParams.user,
                    title: $scope.pins[x].title
                }).then(function (data) {
                //   console.log(data);
                });
            } else {
                $scope.pins[x].isLike = true;
                $scope.pins[x].numLike++;
                users.like({
                    me: $rootScope.user,
                    user : $stateParams.user,
                    title: $scope.pins[x].title
                }).then(function (data) {
                //   console.log(data);
                });
            }
        }
        $http.get("/pin/"+$rootScope.user+"/"+$stateParams.user)
            .then(function(response) {
                // $stateParams.user
                $scope.pins = response.data;
            });
        $scope.remove = function(x) {
            users.removePin({
                user : $rootScope.user,
                title: $scope.pins[x].title
            }).then(function (data) {
                console.log(data);
               $state.reload();
            });
        };
        
        $scope.active = ($stateParams.user == $rootScope.user);
        $scope.addPin = function() {
            users.addPin({
                user : $rootScope.user,
                title: $scope.title,
                url: $scope.url
            }).then(function (data) {
               $state.reload();
            });
        };
        $scope.addX = function() {
            $state.reload();
        }
    }])
    .controller('UsersCtrl', ['$rootScope', '$scope', '$http', '$location', 'users', function($rootScope, $scope, $http, $location, users){
        
        $scope.login = function () {
            users.login({
                email: $scope.email,
                password: $scope.password
            }).then(function (data) {
                console.log(data);
                if(data.data.message == "No user found.") {
                    $scope.messageLogin = "No user found.";
                } else if (data.data.message == "Wrong password.") {
                    $scope.messageLogin = "Wrong password.";
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