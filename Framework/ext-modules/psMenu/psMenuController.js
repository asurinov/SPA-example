"use strict";

angular.module("psMenu").controller("psMenuController",
    ['$scope', '$rootScope',
        function($scope, $rootScope) {
            $scope.showMenu = true;
            $scope.openMenuScope = null;
            $scope.isVertical = true;
            $scope.allowHorizontalToggle = true;

            this.setActiveItem = function (el) {
                $scope.activeElement = el;
            };

            this.getActiveItem = function () {
                return $scope.activeElement;
            };

            this.setRoute = function(route) {
                $rootScope.$broadcast('ps-menu-item-selected-event', { route: route });
            };

            this.isVertical = function() {
                return $scope.isVertical;
            }

            this.setOpenMenuScope = function(scope) {
                $scope.openMenuScope = scope;
            };

            $scope.$on('ps-menu-show', function(evt, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });

            $scope.toggleMenuOrientation = function () {
                if ($scope.openMenuScope)
                    $scope.openMenuScope.closeMenu();

                $scope.isVertical = !$scope.isVertical;
                $rootScope.$broadcast('ps-menu-orientation-changed-event', { isMenuVertical: $scope.isVertical });
            };

            angular.element(document).bind('click', function(e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('ps-selectable-item'))
                        return;
                    $scope.$apply(function() {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    ]);