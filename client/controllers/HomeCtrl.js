var toastr = require('toastr');

var HomeCtrl = function ($scope, $documentCollectionService, $modalService) {
    
    $scope.loadCollections = function () {
        $scope.isLoading = true;
        $documentCollectionService.getDocumentCollections().then(
            function (response) {
                $scope.collections = response.data;
                console.log($scope.collections);
                $scope.isLoading = false;
            }, $scope.processError
        );
    };

    $scope.deleteCollection = function (id) {
        $modalService.confirm("Do you really want to remove the collection?").then(function () {
            $scope.isLoading = true;
             $documentCollectionService.deleteDocumentCollection(id).then(
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
 
    $scope.loadCollections();
};

module.exports = HomeCtrl;

