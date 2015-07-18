"use strict";

angular.module('app').directive('wwa-accordion', function () {
    return {
        controller: 'accordionController',
        templateUrl: './app/accordion/view.html'
    }
});