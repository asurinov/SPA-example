﻿(function() {
    "use strict";

    angular.module('app').controller('appController', ['$scope',
        function ($scope) {
            $scope.signIn = function () {
                $scope.state = 'authorized';
            };
        }
    ]);
})();
