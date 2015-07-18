"use strict";

angular.module('app').directive('objectDesigner', [function() {
    return {
        controller: 'designerController',
        templateUrl: 'app/designer/view.html'
    }
}]);