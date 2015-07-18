"use strict";

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