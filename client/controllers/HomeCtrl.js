var toastr = require('toastr');
var DocumentCollectionService = require('../services/DocumentCollectionService');

var HomeCtrl = function ($scope, DocumentCollectionService) {
    
    $scope.loadCollections = function () {
        $scope.isLoading = true;
        DocumentCollectionService.getDocumentCollections().then(
            function (response) {
                $scope.collections = response.data;
                console.log($scope.collections);
                $scope.isLoading = false;
            },

            function (response) {
                toastr.error("Something went wrong!");
                console.log(response.error);
                $scope.isLoading = false;
            }
        );
    }

    $scope.deleteCollection = function (id) {
        $scope.isLoading = true;
        DocumentCollectionService.deleteDocumentCollection(id).then(
            function (response) {
                $scope.loadCollections();
            },
            function (response) {
                toastr.error("Something went wrong!");
                console.log(response.error);
                $scope.isLoading = false;
            }
        );
    }

    $scope.loadCollections();
};

module.exports = HomeCtrl;

