"use strict";

angular.module('app').directive('wwwEmployee', [
    'dataService', function (dataService) {
        return {
            templateUrl: 'app/widgets/wwwEmployee/wwwEmployeeTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedEmployee = data;
                        scope.isLoaded = true;
                        scope.hasError = false;
                    });
            }
        };
    }
]);