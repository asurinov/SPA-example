

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