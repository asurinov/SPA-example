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