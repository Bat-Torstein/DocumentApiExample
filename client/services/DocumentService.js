var DocumentService = function ($http, $q) {

    return ({
        deleteDocument: deleteDocument,
        uploadDocument : uploadDocument
    });

    function deleteDocument(id) {
        var request = $http({
            method: 'delete',
            url: 'api/document/' + id
        });

        return request;
    }

    function uploadDocument(files, collectionId) {
        var formData = new FormData();

        angular.forEach(files, function (file) {
            formData.append(file.name, file);
        });

        var request = $http.post(
            'api/document/' + collectionId,
            formData, 
            {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }
        );
       
        return request;
    }
};

module.exports = DocumentService;