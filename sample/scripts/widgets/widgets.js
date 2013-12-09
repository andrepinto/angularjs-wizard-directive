(function () {
    
    var widgetsModule = angular.module('widgets', []);
    
    //module configuration
    widgetsModule.provider('widgetsConfig', function () {
        this.config = {
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });
    
})();