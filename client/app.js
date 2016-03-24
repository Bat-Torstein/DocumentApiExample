var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var bootstrap = require('angular-ui-bootstrap');
var toastr = require('toastr');

var HomeCtrl = require('./controllers/HomeCtrl');

var DocumentCollectionService = require('./services/DocumentCollectionService');
var ModalService = require('./services/ModalService');

var documentApp = angular.module('documentApp', ['ngRoute', 'ui.bootstrap']);

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

documentApp.service('DocumentCollectionService', DocumentCollectionService);
documentApp.service('ModalService', ['$uibModal', ModalService]);

documentApp.controller('HomeCtrl', ['$scope','DocumentCollectionService','ModalService', HomeCtrl]);

module.exports = documentApp;