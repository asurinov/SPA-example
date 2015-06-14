angular.module("designer").controller("designerController", ["$scope", function ($scope) {
    $scope.fields = [];
    $scope.item = {
        name: "",
        type: 2
    }
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


    $scope.add = function () {
        $scope.fields.push($scope.item);
        clearForm();
    };

    function clearForm() {
        $scope.item = {
            name: "",
            type: 1
        }
    }
}]);