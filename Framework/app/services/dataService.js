"use strict";

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