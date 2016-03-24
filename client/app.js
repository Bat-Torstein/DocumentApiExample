var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var bootstrap = require('angular-ui-bootstrap');
var toastr = require('toastr');

var HomeCtrl = require('./controllers/HomeCtrl');
var DocumentCollectionCtrl = require('./controllers/DocumentCollectionCtrl');

var DocumentCollectionService = require('./services/DocumentCollectionService');
var ModalService = require('./services/ModalService');
var DocumentService = require('./services/DocumentService.js');

var documentApp = angular.module('documentApp', ['ngRoute', 'ui.bootstrap']);

documentApp.config([
    '$routeProvider',
    function ($routeprovider, $httpProvider) {
        $routeprovider.when('/home', {
            templateUrl: 'client/views/home.html',
            controller: 'HomeCtrl'
        }).when('/document/:id', {
            templateUrl: 'client/views/documentcollection.html',
            controller: 'DocumentCollectionCtrl'
        }).otherwise({
            redirectTo: '/home'
        });
    }]);

documentApp.service('DocumentCollectionService', DocumentCollectionService);
documentApp.service('ModalService', ['$uibModal', ModalService]);
documentApp.service('DocumentService', DocumentService);

documentApp.controller('HomeCtrl', ['$scope', 'DocumentCollectionService', 'ModalService', HomeCtrl]);
documentApp.controller('DocumentCollectionCtrl', ['$scope', '$routeParams', 'DocumentCollectionService', 'DocumentService', 'ModalService', DocumentCollectionCtrl]);

module.exports = documentApp;