var DocumentCollectionService = function ($http, $q) {

    return ({
        getDocumentCollections: getDocumentCollections,
        deleteDocumentCollection: deleteDocumentCollection
    });

    function getDocumentCollections() {
        var request = $http ({
            method : "get",
            url : "api/collection"
        });

        return request;
    }

    function deleteDocumentCollection(id) {
        var request = $http({
            method: "delete",
            url: 'api/collection/' + id
        });

        return request;
    }

};

module.exports = DocumentCollectionService;