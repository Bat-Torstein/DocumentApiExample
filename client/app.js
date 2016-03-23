var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');

var HomeCtrl = require('./controllers/HomeCtrl');
var DocumentCollectionService = require('./services/DocumentCollectionService');

var documentApp = angular.module('documentApp', ['ngRoute']);

documentApp.config([
    '$routeProvider',
    function ($routeprovider, $httpProvider) {
        $routeprovider.when('/home', {
            templateUrl: 'client/views/home.html',
            controller: 'HomeCtrl'
        }).otherwise({
            redirectTo: '/home'
        });
    }]);

documentApp.controller('HomeCtrl', HomeCtrl);
documentApp.service("DocumentCollectionService", DocumentCollectionService);

module.exports = documentApp;