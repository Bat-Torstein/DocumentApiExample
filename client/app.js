var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var HomeCtrl = require ('./controllers/HomeCtrl');

var documentApp = angular.module('documentApp', ['ngRoute', 'ngResource']);

documentApp.config([
    '$routeProvider',
    function ($routeprovider, $httpProvider) {
        $routeprovider.when('/home', {
            templateUrl: 'client/views/home.html',
            controller: HomeCtrl
        }).otherwise({
            redirectTo: '/home'
        });
    }]);

module.exports = documentApp;