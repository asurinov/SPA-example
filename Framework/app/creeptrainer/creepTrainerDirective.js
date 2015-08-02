"use strict";
angular.module('app').directive('creepTrainer', ["$interval", function ($interval) {
    function creepTrainerLink(scope, element, attrs) {
        scope.units = [];

        var $creepStat = element.find('#creepStat');
        var $creepLost = element.find('#creepLost');
        var $clickStat = element.find('#clickStat');
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

        scope.getType = function(val) {
            var type;
            if (val < 25) {
                type = 'danger';
            } else if (val < 50) {
                type = 'warning';
            } else if (val < 75) {
                type = 'info';
            } else {
                type = 'success';
            }
            return type;
        }

        scope.onHit = function(elem, index) {
            $clickStat.text(parseInt($clickStat.text()) + 1);
            var hpLeft = elem.$hp - USER_DMG;
            if (hpLeft < 0) {
                scope.units.splice(index, 1);
                $creepStat.text(parseInt($creepStat.text()) + 1);
            } else {
                elem.$hp = hpLeft;
            }
        }

        var Unit = function () {
            this.$hp = 100;
            this.constructor = function () {
                this.timer = $interval(function () {
                    var hp = this.$hp - getRandomInt(MIN_DMG, MAX_DMG);
                    if (hp > 0) {
                        this.$hp = hp;
                    } else {
                        $creepLost.text(parseInt($creepLost.text()) + 1);
                        this.destroy();
                    }
                }.bind(this), getRandomInt(MIN_DMG_INTERVAL, MAX_DMG_INTERVAL));
            };
            this.destroy = function () {
                $interval.cancel(this.timer);
            };
            this.constructor();
        }

        scope.units.push(new Unit());
        $interval(function () {
            scope.units.push(new Unit());
        }, getRandomInt(MIN_RESPAWN_PERIOD, MAX_RESPAWN_PERIOD));
    }

    return {
        restrict: 'E',
        link: creepTrainerLink,
        scope: {

        },
        templateUrl: 'app/creeptrainer/view.html'
    }
}]);
