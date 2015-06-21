angular.module("designer").controller("designerController", ["$scope", function ($scope) {
    $scope.fields = [];
    $scope.selectedRegistry = null;

    $scope.item = {
        name: "",
        type: null
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

    $scope.registry = [
        {
            id: 1,
            name: "Item1",
            type: 'registry-folder',
            children: []
        },
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

    $scope.removeParam = function(index) {
        $scope.selectedRegistry.parameters.splice(index, 1);
    }

    function clearForm() {
        $scope.item = {
            name: "",
            type: null
        }
    }

    $scope.canAdd = function() {
        return $scope.item && $scope.item.name !== "" && $scope.item.type != null;
    };

    $scope.selectRegistry = function(reg) {
        if (reg.type === 'registry-folder') {

        } else {
            $scope.selectedRegistry = reg;
        }
    }

    $scope.canDrop = function(type) {
        return type === 'registry-folder';
    }

    $scope.dropCallback = function(dragmodel) {
        var x = 1;
    }
}]);