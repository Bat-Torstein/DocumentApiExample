var toastr = require('toastr');

var HomeCtrl = function ($scope, $documentCollectionService, $modalService) {
    
    $scope.loadCollections = function () {
        $scope.isLoading = true;
        $documentCollectionService.getCollections().then(
            function (response) {
                $scope.collections = response.data;
                $scope.isLoading = false;
            }, $scope.processError
        );
    };

    $scope.deleteCollection = function (id) {
        $modalService.confirm("Do you really want to remove the collection?").then(function () {
            $scope.isLoading = true;
             $documentCollectionService.deleteCollection(id).then(
                function (response) {
                    $scope.loadCollections();
                }, $scope.processError
            );
        });
    };

    $scope.processError = function (response) {
        toastr.error("Something went wrong!");
        console.log(response.statusText);
        $scope.isLoading = false;
    };

    $scope.addNewCollection = function () {
        if (!$scope.newCollectionName) {
            toastr.error("Enter name of new collection");
            return;
        }
        $documentCollectionService.createCollection($scope.newCollectionName).then(
            function (response) {
                $scope.newCollectionName = "";
                $scope.loadCollections();
            }, $scope.processError
        );
    };
 
    $scope.loadCollections();
    $scope.newCollectionName = "";
};

module.exports = HomeCtrl;

