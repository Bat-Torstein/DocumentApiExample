var ModalService = function ($uibModal) {
    return {
        showModal: showModal,
        ok: ok,
        confirm: confirm
    };

    function showModal (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return show(customModalDefaults, customModalOptions);
    }

    function ok(headerText, bodyText) {
        return showModal({}, {
            closeButtonText: 'Ok',
            actionButtonText: '',
            headerText: headerText,
            bodyText: bodyText
        });
    }

    function confirm(bodyText) {
        return showModal({}, {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Confirm',
            bodyText: bodyText
        });
    }

    function show(customModalDefaults, customModalOptions) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/client/views/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        var tempModalDefaults = {};
        var tempModalOptions = {};
 
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
        angular.extend(tempModalOptions, modalOptions, customModalOptions);
 
        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            };
        }
 
        return $uibModal.open(tempModalDefaults).result;
    }
 
};

module.exports = ModalService;
