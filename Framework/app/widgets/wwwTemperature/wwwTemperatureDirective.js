"use strict";

angular.module('app').directive('wwwTemperature', [
    'dataService', function(dataService) {
        return {
            templateUrl: 'app/widgets/wwwTemperature/wwwTemperatureTemplate.html',
            link: function (scope, el, attrs) {
                scope.selectedLocation = null;

                scope.loadLocation = function () {
                    scope.hasError = false;
                    dataService.getLocation(scope.item.widgetSettings.id)
                    .then(function(data) {
                            scope.selectedLocation = data;
                            scope.isLoaded = true;
                            scope.hasError = false;
                        }, function(data) {
                            //error
                            scope.hasError = true;
                        }
                    );
                }

                scope.loadLocation();
            }
        };
    }
]);