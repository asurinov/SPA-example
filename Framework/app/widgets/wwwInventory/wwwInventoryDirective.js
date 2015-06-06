"use strict";

angular.module('app').directive('wwwInventory', [
    'dataService', function(dataService) {
        return {
            templateUrl: 'app/widgets/wwwInventory/wwwInventoryTemplate.html',
            link: function(scope, el, attrs) {
                dataService.getLocation(scope.item.widgetSettings.id)
                    .then(function(data) {
                        scope.selectedLocation = data;
                        scope.isLoaded = true;
                        scope.hasError = false;
                    });
            }
        };
    }
]);