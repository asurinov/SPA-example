"use strict";

angular.module('app').directive('wwaDashboard', ['$localStorage', function($localStorage) {
    return {
        scope: {
            
        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {
            scope.title = 'My first dashboard';

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: false
            };

            scope.widgetDefinitions = [
                {
                    title: 'Temperature',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        title: 'First',
                        template: '<www-temperature></www-tempareture>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwwSelectLocationTemplate.html',
                            controller: 'wwwSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Employee',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 5,
                        minSizeY: 2,
                        title: 'Second',
                        template: '<www-employee></www-employee>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'app/dialogs/wwwSelectEmployeeTemplate.html',
                            controller: 'wwwSelectEmployeeController'
                        }
                    }
                },
                {
                    title: 'Inventory',
                    settings: {
                        sizeX: 8,
                        sizeY: 3,
                        minSizeX: 4,
                        minSizeY: 2,
                        title: 'Third',
                        template: '<www-inventory></www-inventory>',
                        widgetSettings: {
                            id: 1001,
                            templateUrl: 'app/dialogs/wwwSelectLocationTemplate.html',
                            controller: 'wwwSelectLocationController'
                        }
                    }
                }
            ];

            scope.widgets = $localStorage.widgets || [];

            scope.$watch('widgets', function() {
                $localStorage.widgets = scope.widgets;
            }, true);
        }
    }
}]);