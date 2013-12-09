(function() {
    'use strict'
    
    var controllerId = 'appController' ;
    angular.module('app').controller(controllerId, ['$scope', appController]);

    function appController(util,$scope, ck) {
        
        var vm = this;
        
        vm.user={
            email:''
        };
        
        vm.validationStep = function(item, actions) {
            console.log(item);
            console.log(actions);
            if(vm.user.email.length<=0)
                actions.error(['email is required']);
            else
                actions.success();
            
        }

        vm.completeWizard = function(scope, actions) {
            console.log('completed');
        }
       
    }
})();