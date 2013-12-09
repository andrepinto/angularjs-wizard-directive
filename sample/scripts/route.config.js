(function () {
'use strict';

var app = angular.module('app');

app.constant('routes', getRoutes());

app.config(['$routeProvider', 'routes', routeConfigurator]);
function routeConfigurator($routeProvider, routes) {

    routes.forEach(function(r) {
        $routeProvider.when(r.url, r.config);
    });
    $routeProvider.otherwise({redirectTo: '/'});
}

function getRoutes() {
    return [
        {
            url: '/wizard',
            config: {
                templateUrl: 'views/wizard.html',
                title: 'Wizard',
            }
        }
    ];
};
})();
