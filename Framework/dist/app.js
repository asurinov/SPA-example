

angular.module( "app", ["ngRoute", "psFramework", "ngStorage", "dnd"]);


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


angular.module('app').directive('objectDesigner', [function() {
    return {
        controller: 'designerController',
        templateUrl: 'app/designer/view.html'
    }
}]);
angular.module("app").controller("designerController", ["$scope", function ($scope) {
    $scope.fields = [];
    $scope.selectedRegistry = null;

    $scope.item = {
        name: "",
        type: null
    }

    $scope.datasources = [];

    $scope.types = [
        {
            id: 1,
            name: "One"
        },
        {
            id: 2,
            name: "Two"
        },
        {
            id: 3,
            name: "Three"
        }
    ];

    $scope.registry = [
        {
            id: 2,
            name: "Item2",
            parameters: [
                {
                    name: 'Parameter21',
                    type: 2
                },
                {
                    name: 'Parameter22',
                    type: 3
                }
            ],
            type: 'registry-item'
        },
        {
            id: 3,
            name: "Item3",
            parameters: [
                {
                    name: 'Parameter31',
                    type: 1
                },
                {
                    name: 'Parameter32',
                    type: 2
                }
            ],
            type: 'registry-item'
        }
    ];


    $scope.add = function () {
        $scope.selectedRegistry.parameters.push($scope.item);
        clearForm();
    };

    $scope.removeParam = function (index) {
        $scope.selectedRegistry.parameters.splice(index, 1);
    }

    function clearForm() {
        $scope.item = {
            name: "",
            type: null
        }
    }

    $scope.canAdd = function () {
        return $scope.item && $scope.item.name !== "" && $scope.item.type != null;
    };

    $scope.selectRegistry = function (reg) {
        if (reg.type === 'registry-folder') {

        } else {
            $scope.selectedRegistry = reg;
        }
    }

    $scope.canDrop = function (type) {
        return type === 'registry-folder';
    }

    $scope.dropCallback = function (dragmodel) {
        $scope.registry = _.filter($scope.registry, function(item) {
            return item.id !== dragmodel.id;
        });
        $scope.dropmodel.children.push(dragmodel);
    }

    $scope.onAddDataSource = function (dragmodel) {
        $scope.datasources.push(dragmodel);
    }

    $scope.dropmodel = {
        id: 1,
        name: "Item1",
        type: 'registry-folder',
        children: []
    };

    $scope.onDragOver = function(dropModel, dragModel) {
        var x = 1;
    }
}]);
(function() {
    angular.module("app").controller("creepTrainerController", [
        '$scope', '$element', function($scope, $element) {
            var $container = $('#container');
            var $creepStat = $('#creepStat');
            var $creepLost = $('#creepLost');
            var $clickStat = $('#clickStat');
            var USER_DMG = 20;
            var MIN_DMG = 5;
            var MAX_DMG = 15;
            var MIN_DMG_INTERVAL = 1000;
            var MAX_DMG_INTERVAL = 3000;
            var MIN_RESPAWN_PERIOD = 1500;
            var MAX_RESPAWN_PERIOD = 2500;
            var $score = 0;

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var Unit = function() {
                this.$el = $('#unitTemplate>.unit').clone();
                this.$hp = this.$el.find('progress');
                this.constructor = function() {
                    this.timer = setInterval(function() {
                        var hp = this.$hp.val() - getRandomInt(MIN_DMG, MAX_DMG);
                        if (hp > 0) {
                            this.$hp.val(hp);
                        } else {
                            $creepLost.text(parseInt($creepLost.text()) + 1);
                            this.destroy();
                        }
                    }.bind(this), getRandomInt(MIN_DMG_INTERVAL, MAX_DMG_INTERVAL));
                    this.$el.click(this.onHit.bind(this));
                };
                this.destroy = function() {
                    clearTimeout(this.timer);
                    this.$el.remove();
                };
                this.onHit = function() {
                    $clickStat.text(parseInt($clickStat.text()) + 1);
                    var hpLeft = this.$hp.val() - USER_DMG;
                    if (hpLeft < 0) {
                        this.destroy();
                        $creepStat.text(parseInt($creepStat.text()) + 1);
                    } else {
                        this.$hp.val(hpLeft);
                    }
                }
                this.constructor();
            }

            $container.append((new Unit()).$el);
            setInterval(function() {
                $container.append((new Unit()).$el);
            }, getRandomInt(MIN_RESPAWN_PERIOD, MAX_RESPAWN_PERIOD));
        }
    ]);
})();




angular.module('app').directive('wwa-accordion', function () {
    return {
        controller: 'accordionController',
        templateUrl: './app/accordion/view.html'
    }
});
angular.module('app').controller('accordionController', ['$scope', function($scope) {
    $scope.panels = [
        {
            caption: 'Caption1',
            body: '1'
        },
        {
            caption: 'Caption2',
            body: '2'
        }
    ];
}]);
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/accordion/view.html","<div class=\"wwa-accordion\" ng-controller=\"accordionController\">\r\n    <div class=\"wwa-accordion-panel\" ng-repeat=\"panel in panels\">\r\n        <div class=\"wwa-accordion-panel-caption\"></div>\r\n        <div class=\"wwa-accordion-panel-body\"></div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("app/creeptrainer/view.html","<div class=\"container-fluid\" ng-controller=\"creepTrainerController\">\r\n    <div>Крипцов добито: <span id=\"creepStat\">0</span></div>\r\n    <div>Крипцов потеряно: <span id=\"creepLost\">0</span></div>\r\n    <div>Кликов: <span id=\"clickStat\">0</span></div>\r\n    <div id=\"unitTemplate\">\r\n        <div class=\"unit\">\r\n            <progress max=\"100\" value=\"100\"></progress>\r\n            <div class=\"target\"></div>\r\n        </div>\r\n    </div>\r\n    <div id=\"container\"></div>\r\n</div>");
$templateCache.put("app/designer/view.html","<div class=\"container-fluid\" ng-controller=\"designerController\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3 registry-view\">\r\n            <h3>Registry</h3>\r\n            <div class=\"well\" ng-repeat=\"reg in registry\" ng-click=\"selectRegistry(reg)\" ng-class=\"{\'selected\' : selectedRegistry.id === reg.id}\"\r\n                 dnd-draggable dnd-model=\"reg\" dnd-draggable-opts=\"{ helper: \'clone\', handle: \'.handle\', layer: \'registry\'}\">\r\n                <i class=\"fa fa-2x fa-bars handle\"></i>\r\n                <i class=\"fa fa-2x\" ng-class=\"{\'fa-folder\' : reg.type === \'registry-folder\', \'fa-newspaper-o\' : reg.type === \'registry-item\'}\"></i>\r\n                <span>{{reg.name}}</span>\r\n                <span class=\"counter pull-right\" ng-if=\"reg.type === \'registry-folder\' && reg.children\">{{reg.children.length}}</span>\r\n            </div>\r\n            <div class=\"well\" ng-click=\"selectRegistry(dropmodel)\"\r\n                 dnd-droppable=\"true\" dnd-model=\"dropmodel\" dnd-droppable-opts=\"{layer: \'registry\'}\" dnd-on-drop=\"dropCallback($dragmodel)\"\r\n                 dnd-on-dragover=\"onDragOver($dropmodel, $dragmodel)\">\r\n                <i class=\"fa fa-2x fa-bars handle\"></i>\r\n                <i class=\"fa fa-2x fa-folder\"></i>\r\n                <span>DropHere</span>\r\n                <span class=\"counter pull-right\" ng-if=\"dropmodel.type === \'registry-folder\' && dropmodel.children\">{{dropmodel.children.length}}</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <h3>Parameters</h3>\r\n            <div class=\"form-inline\">\r\n                <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" />\r\n                    <select class=\"form-control\" ng-options=\"type.name for type in types track by type.id\" ng-model=\"item.type\"></select>\r\n                    <button class=\"btn btn-primary\" ng-disabled=\"!canAdd()\" ng-click=\"add()\">Добавить</button>\r\n                </div>\r\n            </div>\r\n            <div class=\"parameter\" ng-repeat=\"field in selectedRegistry.parameters\" dnd-sortable>\r\n                <div class=\"form-inline\">\r\n                    <div class=\"form-group\">\r\n                        <i class=\"fa fa-2x fa-bars handle\"></i>\r\n                        <input type=\"text\" class=\"form-control\" ng-model=\"field.name\" />\r\n                        <select class=\"form-control\" ng-options=\"type.name for type in types track by type.id\" ng-model=\"field.type\"></select>\r\n                        <i class=\"fa fa-remove\" ng-click=\"removeParam($index)\"></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> \r\n        <div class=\"col-md-3\">\r\n            <div class=\"datasource\" dnd-droppable=\"true\" dnd-droppable-opts=\"{layer: \'registry\'}\" dnd-on-drop=\"onAddDataSource($dragmodel)\">Drag Here</div>\r\n            <ul>\r\n                <li ng-repeat=\"source in datasources\">\r\n                    <span ng-bind=\"source.name\"></span>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("app/dialogs/wwwSelectEmployeeTemplate.html","<div class=\"modal-header\">\r\n    <h3 class=\"modal-title\">Select Employee</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n    <h3>Name</h3>\r\n    <select ng-show=\"isLoaded\"\r\n            ng-model=\"selectedEmployee\" \r\n            ng-options=\"employee.name for employee in employees\"></select>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\" ng-click=\"saveSettings()\" type=\"button\">Save</button>\r\n    <button class=\"btn btn-primary\" ng-click=\"$dismiss()\" type=\"button\">Cancel</button>\r\n</div>");
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
            },
            {
                url: '/designer',
                config: {
                    templateUrl: '/app/designer/view.html',
                    controller: 'designerController'
                }
            },
            {
                url: '/creeptrainer',
                config: {
                    templateUrl: '/app/creeptrainer/view.html',
                    controller: 'creepTrainerController'
                }
            },
            {
                url: '/accordion',
                config: {
                    template: '<wwa-accordion></wwa-accordion>'
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