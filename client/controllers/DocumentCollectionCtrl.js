var toastr = require('toastr');

var DocumentCollectionCtrl = function ($scope, $routeParams, $documentCollectionService, $documentService, $modalService) {

    $scope.loadCollection = function (id) {
        $scope.isLoading = true;
        $documentCollectionService.getCollection(id).then(
            function (response) {
                $scope.collection = response.data;
                $scope.isLoading = false;
            }, $scope.processError
        );
    };

    $scope.processError = function (response) {
        toastr.error("Something went wrong!");
        console.log(response.statusText);
        $scope.isLoading = false;
    };

    $scope.processError = function (response) {
        toastr.error("Something went wrong!");
        console.log(response.statusText);
        $scope.isLoading = false;
    };

    $scope.uploadDocument = function () {
    };

    $scope.deleteDocument = function (id) {
        $modalService.confirm("Do you really want to remove the document?").then(function () {
            $scope.isLoading = true;
            $documentService.deleteDocument(id).then(
               function (response) {
                   $scope.loadCollection($scope.collection.Id);
               }, $scope.processError
           );
        });
    };


    $scope.loadCollection($routeParams.id);
};

module.exports = DocumentCollectionCtrl;

