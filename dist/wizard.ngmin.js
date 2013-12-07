(function () {
  'use strict';
  angular.module('widgets').directive('wizard', function () {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      templateUrl: 'templates/wizard.tmp.html',
      scope: {
        onValidationStep: '&',
        onCompletedWizard: '&',
        config: '=',
        next: '@',
        previous: '@',
        end: '@'
      },
      controller: [
        '$scope',
        function ($scope) {
          var me = this;
          me.events = [];
          me.exeIndex = 0;
          me.completeSteps = [];
          me.ACTIVE = 'active';
          me.SUCCESS = 'success';
          me.NO_ACTIVE = 'no-active';
          me.EVT_CHANGE = 'onValidationStep';
          me.EVT_COMPLETED = 'onCompletedStep';
          $scope.steps = [];
          $scope.selectedIndex = 0;
          $scope.lastStep = false;
          $scope.showErrors = false;
          $scope.errors = [];
          $scope.selectedItem = {};
          $scope.selectStep = function (index) {
            $scope.managerStep(index);
            $scope.selectedIndex = index;
          };
          $scope.clickStep = function (index) {
            if (me.isCompleted(index))
              if ($scope.selectedIndex < index)
                $scope.stepAction(index);
              else {
                me.exeIndex = index;
                me.successStepChange();
              }
          };
          $scope.stepAction = function (index) {
            me.exeIndex = index;
            var event = me.getEvent(me.EVT_CHANGE);
            if (event != undefined)
              me.fireEvent(event, me.returValidationType);
            else
              me.successStepChange();
          };
          $scope.showPrev = function () {
            if ($scope.selectedIndex == 0)
              return false;
            else
              return true;
          };
          $scope.managerStep = function (index) {
            angular.forEach($scope.steps, function (scope) {
              if (scope.hd.index === index) {
                scope.show = true;
                scope.hd.active = me.ACTIVE;
                $scope.selectedItem = scope.hd;
              } else if (scope.hd.index < index) {
                scope.show = false;
                scope.hd.active = me.SUCCESS;
              } else {
                scope.show = false;
                scope.hd.active = me.NO_ACTIVE;
              }
            });
          };
          $scope.completeWizard = function () {
            var event = me.getEvent(me.EVT_COMPLETED);
            if (event != undefined)
              me.fireEvent(event, me.returnChangeSType);
            else
              me.successStepPrevChange();
          };
          me.registerEvent = function (event) {
            me.events.push(event);
          };
          me.setStep = function (step) {
            if ($scope.steps.length === 0) {
              $scope.selectedItem = step.hd;
            }
            $scope.steps.push(step);
          };
          me.getStepsSize = function () {
            return $scope.steps.length;
          };
          me.fireEvent = function (event, actions) {
            event.data($scope.selectedItem, actions);
          };
          me.getEvent = function (name) {
            var evt;
            angular.forEach(me.events, function (event) {
              if (event.name === name)
                evt = event;
            });
            return evt;
          };
          me.successStepChange = function () {
            $scope.showErrors = false;
            var newIndex = me.exeIndex;
            me.completeSteps.push($scope.selectedIndex);
            $scope.selectedIndex = newIndex;
            $scope.selectStep($scope.selectedIndex);
            if (newIndex < $scope.steps.length - 1) {
              $scope.lastStep = false;
            } else {
              $scope.lastStep = true;
            }
          };
          me.isCompleted = function (index) {
            for (var i = 0; i < me.completeSteps.length; i++) {
              if (me.completeSteps[i] === index)
                return true;
            }
            return false;
          };
          me.errorStepChange = function (errors) {
            if (errors != undefined) {
              $scope.showErrors = true;
              $scope.errors = errors;
            }
            $scope.selectedItem.complete = false;
          }, me.returValidationType = {
            success: me.successStepChange,
            error: me.errorStepChange
          };
        }
      ],
      link: function (scope, element, attrs, controller) {
        if (attrs.onValidationStep != undefined) {
          controller.registerEvent({
            name: controller.EVT_CHANGE,
            data: scope.onValidationStep()
          });
        }
        if (attrs.onCompletedWizard != undefined) {
          controller.registerEvent({
            name: controller.EVT_COMPLETED,
            data: scope.onCompletedWizard()
          });
        }
      }
    };
  }).directive('wizardGroup', [
    '$parse',
    function ($parse) {
      return {
        restrict: 'E',
        require: '^wizard',
        template: '<div ng-transclude ng-show="show"></div>',
        transclude: true,
        scope: { title: '@' },
        link: function (scope, element, attrs, controller) {
          if (attrs.active == undefined)
            scope.show = false;
          else
            scope.show = attrs.active;
          scope.hd = {
            name: scope.title,
            index: controller.getStepsSize(),
            active: scope.show ? controller.ACTIVE : controller.NO_ACTIVE
          };
          controller.setStep(scope);
        }
      };
    }
  ]);
}());