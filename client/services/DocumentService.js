var DocumentService = function ($http, $q) {

    return ({
        deleteDocument: deleteDocument,
    });

    function deleteDocument(id) {
        var request = $http({
            method: 'delete',
            url: 'api/document/' + id
        });

        return request;
    }
};

module.exports = DocumentService;