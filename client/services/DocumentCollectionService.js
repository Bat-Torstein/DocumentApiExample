var DocumentCollectionService = function ($http, $q) {

    return ({
        getCollections: getCollections,
        deleteCollection: deleteCollection,
        createCollection: createCollection,
        getCollection : getCollection
    });

    function getCollections() {
        var request = $http ({
            method : 'get',
            url : 'api/collection'
        });

        return request;
    }

    function getCollection(id) {
        var request = $http({
            method: 'get',
            url: 'api/collection/' + id 
        });

        return request;
    }

    function deleteCollection(id) {
        var request = $http({
            method: 'delete',
            url: 'api/collection/' + id
        });

        return request;
    }

    function createCollection(name) {
        var request = $http({
            method: 'post',
            url: 'api/collection',
            data: { Name: name }
        });

        return request;
    }
};

module.exports = DocumentCollectionService;