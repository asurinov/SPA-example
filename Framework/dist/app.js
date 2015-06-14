

angular.module( "app", ["ngRoute", "psFramework", "ngStorage"]);


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


angular.module('app').factory('dataService', [
    '$timeout',
    function($timeout) {
        var locations = [
            {
                id: 1000,
                name: 'Oka',
                temperature: 20,
                guides: 20,
                rafts: 18,
                vests: 200,
                image: 'oka-river.jpg'
            },
            {
                id: 1001,
                name: 'Black River',
                temperature: 9,
                guides: 36,
                rafts: 22,
                vests: 250,
                image: 'black-river.png'
            }
        ];

        var employees = [
            {
                id: 5000,
                name: 'Trevor',
                location: 'Sandy Shores',
                image: 'employee-trevor.jpg'
            },
            {
                id: 5001,
                name: 'Michael',
                location: 'Rockford Hills',
                image: 'employee-michael.png'
            },
            {
                id: 5002,
                name: 'Franklin',
                location: 'Vinewood Hills',
                image: 'employee-franklin.png'
            },
        ];

        var getLocations = function() {
            return $timeout(function() {
                return locations;
            }, 500);
        };

        var getLocation = function (id) {
            return $timeout(function () {
                for (var i = 0; i < locations.length; i++) 
                    if (locations[i].id == id)
                        return locations[i];
                return undefined;
            }, 2500);
        };

        var getEmployees = function () {
            return $timeout(function () {
                return employees;
            }, 500);
        };

        var getEmployee = function (id) {
            return $timeout(function () {
                for (var i = 0; i < employees.length; i++)
                    if (employees[i].id == id)
                        return employees[i];
                return undefined;
            }, 250);
        };

        return {
            getLocations: getLocations,
            getLocation: getLocation,
            getEmployees: getEmployees,
            getEmployee: getEmployee
        };
    }
]);


angular.module('app').directive('wwaLocations', [function () {
    return {
        scope: {

        },
        template: '<h1>Location Page</h1>'
    }
}]);


angular.module('app').directive('wwaGuides', [function () {
    return {
        scope: {

        },
        template: '<h1>Guide Page</h1>'
    }
}]);


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


angular.module('app').controller('wwwSelectLocationController', [
    '$scope', 'dataService',
    function ($scope, dataService) {
        $scope.isLoaded = false;
        dataService.getLocations().then(function(data) {
            $scope.locations = data;
            $scope.isLoaded = true;

            for (var i = 0; i < data.length; i++) {
                if (data[i].id == $scope.item.widgetSettings.id)
                    $scope.selectedLocation = data[i];
            }
        });

        $scope.saveSettings = function() {
            $scope.item.widgetSettings.id = $scope.selectedLocation.id;
            $scope.$parent.selectedLocation = $scope.selectedLocation;
            $scope.$close();
        };
    }
]);


angular.module('app').controller('wwwSelectEmployeeController', [
    '$scope', 'dataService',
    function($scope, dataService) {
        $scope.isLoaded = false;
        dataService.getEmployees().then(function (data) {
            $scope.employees = data;
            $scope.isLoaded = true;

            for (var i = 0; i < data.length; i++) {
                if (data[i].id == $scope.item.widgetSettings.id)
                    $scope.selectedEmployee = data[i];
            }
        });

        $scope.saveSettings = function () {
            $scope.item.widgetSettings.id = $scope.selectedEmployee.id;
            $scope.$parent.selectedEmployee = $scope.selectedEmployee;
            $scope.$close();
        };
    }
]);
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/dialogs/wwwSelectEmployeeTemplate.html","<div class=\"modal-header\">\r\n    <h3 class=\"modal-title\">Select Employee</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n    <h3>Name</h3>\r\n    <select ng-show=\"isLoaded\"\r\n            ng-model=\"selectedEmployee\" \r\n            ng-options=\"employee.name for employee in employees\"></select>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\" ng-click=\"saveSettings()\" type=\"button\">Save</button>\r\n    <button class=\"btn btn-primary\" ng-click=\"$dismiss()\" type=\"button\">Cancel</button>\r\n</div>");
$templateCache.put("app/dialogs/wwwSelectLocationTemplate.html","<div class=\"modal-header\">\r\n    <h3 class=\"modal-title\">Select Location</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n    <h3>Name</h3>\r\n    <select ng-show=\"isLoaded\"\r\n            ng-model=\"selectedLocation\"\r\n            ng-options=\"location.name for location in locations\"></select>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\" ng-click=\"saveSettings()\" type=\"button\">Save</button>\r\n    <button class=\"btn btn-primary\" ng-click=\"$dismiss()\" type=\"button\">Cancel</button>\r\n</div>\r\n");
$templateCache.put("app/widgets/wwwEmployee/wwwEmployeeTemplate.html","<div class=\"www-widget\">\r\n    <div class=\"www-widget-heading www-employee-heading\">\r\n        <img class=\"www-widget-icon\" ng-src=\"images/employee-icon.png\" alt=\"\" />\r\n        <span class=\"www-widget-title\">Employee</span>\r\n    </div>\r\n\r\n    <div class=\"www-widget-body\">\r\n        <div ng-if=\"!isLoaded && !hasError\">\r\n            <i class=\"fa fa-2x fa-refresh fa-spin\"></i>\r\n        </div>\r\n        <div ng-if=\"isLoaded\" class=\"www-employee-area\">\r\n            <div class=\"www-employee-name-area\">\r\n                <h4>EMPLOYEE NAME</h4>\r\n                <p>{{selectedEmployee.name}}</p>\r\n                <h4>LOCATION</h4>\r\n                <p>{{selectedEmployee.location}}</p>\r\n            </div>\r\n            <div class=\"www-employee-picture-area\" ng-style=\"selectedEmployee != null && {\'background-image\': \'url(/images/\' + selectedEmployee.image + \')\'}\"></div>\r\n        </div>\r\n        <div ng-if=\"hasError\">\r\n            <h4>Error loading widget</h4>\r\n            <button class=\"btn btn-primary\" ng-click=\"loadLocation()\">Reload</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("app/widgets/wwwInventory/wwwInventoryTemplate.html","<div class=\"www-widget\">\r\n    <div class=\"www-widget-heading www-inventory-heading\">\r\n        <img class=\"www-widget-icon\" ng-src=\"images/inventory-icon.png\" alt=\"\" />\r\n        <span class=\"www-widget-title\">Inventory</span>\r\n    </div>\r\n\r\n    <div class=\"www-widget-body\" ng-style=\"selectedLocation != null && {\'background-image\': \'url(/images/\' + selectedLocation.image + \')\'}\">\r\n        <div ng-if=\"!isLoaded && !hasError\">\r\n            <i class=\"fa fa-2x fa-refresh fa-spin\"></i>\r\n        </div>\r\n        <div ng-if=\"isLoaded\" class=\"www-inventory-area\">\r\n            <div class=\"www-widget-river-name\">\r\n                {{selectedLocation.name}}\r\n            </div>\r\n            <div class=\"www-inventory-item\">\r\n                <img src=\"/images/guide-icon.png\" />\r\n                <span class=\"www-inventory-amount\">{{selectedLocation.guides}}</span>\r\n                <span class=\"www-inventory-caption\">GUIDES</span>\r\n            </div>\r\n            <div class=\"www-inventory-item\">\r\n                <img src=\"/images/vest-icon.png\" />\r\n                <span class=\"www-inventory-amount\">{{selectedLocation.vests}}</span>\r\n                <span class=\"www-inventory-caption\">VESTS</span>\r\n            </div>\r\n            <div class=\"www-inventory-item\">\r\n                <img src=\"/images/raft-icon.png\" />\r\n                <span class=\"www-inventory-amount\">{{selectedLocation.rafts}}</span>\r\n                <span class=\"www-inventory-caption\">RAFTS</span>\r\n            </div>\r\n        </div>\r\n        <div ng-if=\"hasError\">\r\n            <h4>Error loading widget</h4>\r\n            <button class=\"btn btn-primary\" ng-click=\"loadLocation()\">Reload</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("app/widgets/wwwTemperature/wwwTemperatureTemplate.html","<div class=\"www-widget\">\r\n    <div class=\"www-widget-heading www-temperature-heading\">\r\n        <img class=\"www-widget-icon\" ng-src=\"images/therm-icon.png\" alt=\"\" />\r\n        <span class=\"www-widget-title\">Temp</span>\r\n    </div>\r\n\r\n    <div class=\"www-widget-body\" ng-style=\"selectedLocation != null && {\'background-image\': \'url(/images/\' + selectedLocation.image + \')\'}\">\r\n        <div ng-if=\"!isLoaded && !hasError\">\r\n            <i class=\"fa fa-2x fa-refresh fa-spin\"></i>\r\n        </div>\r\n        <div ng-if=\"isLoaded\" class=\"www-widget-view www-temperature-view\">\r\n            <div class=\"www-widget-river-name\">\r\n                {{selectedLocation.name}}\r\n            </div>\r\n            <div class=\"www-temperature-degrees\">\r\n                {{selectedLocation.temperature}}&deg;\r\n            </div>\r\n        </div>\r\n        <div ng-if=\"hasError\">\r\n            <h4>Error loading widget</h4>\r\n            <button class=\"btn btn-primary\" ng-click=\"loadLocation()\">Reload</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n");}]);


angular.module('app').config([
    "$routeProvider", function($routeProvider) {
        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<wwa-dashboard></wwa-dashboard>'
                }
            },
            {
                url: '/locations',
                config: {
                    template: '<wwa-locations></wwa-locations>'
                }
            },
            {
                url: '/guides',
                config: {
                    template: '<wwa-guides></wwa-guides>'
                }
            }
        ];

        routes.forEach(function(route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: 'dashboard' });
    }
]);


angular.module('app').controller('appController', ['$scope',
    function ($scope) {
        $scope.state = 'unauthorized';

        $scope.signIn = function() {
            $scope.state = 'authorized';
        };
    }
]);
angular.module("app").config(function($provide) {
    $provide.decorator("$exceptionHandler", [
        "$delegate", function($delegate) {
            return function(exception, cause) {
                $delegate(exception, cause);
                alert(exception.message);
            };
        }
    ]);
});