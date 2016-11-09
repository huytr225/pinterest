'use strict';

angular.module('users', ['ngResource'])
  .service('users', function ($http) {
        this.login = function (data) {
            return $http({
                method: "POST",
                url: "users/login",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        };
        
        this.register = function (data) {
            return $http({
                method: "POST",
                url: "users/signup",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        };
        this.like = function(data){
            return $http({
                method: "POST",
                url: "/like",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        }
        this.unlike = function(data){
            console.log(data);
            return $http({
                method: "POST",
                url: "/unlike",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        }
        this.addPin = function (data) {
            return $http({
                method: "POST",
                url: "pin",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        };
        this.removePin = function (data) {
            return $http({
                method: "POST",
                url: "remove",
                data: data
            }).success(function (data) {
                return data;
            }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        };
  });
