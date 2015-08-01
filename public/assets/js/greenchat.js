var greenchat;

greenchat = angular.module('greenchat', ["firebase", "ngRoute"]);

greenchat.config([
    '$routeProvider', function($routeProvider) {
        $routeProvider.when('/' + ':currentRoom', {
            controller: 'roomCtrl',
            templateUrl: '/partials/messages.html'
        }).otherwise({redirectTo: '/general'});
    }
]);

greenchat.factory('socket', [
    '$rootScope', function($rootScope) {
        var socket;
        socket = io.connect();
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args;
                    args = arguments;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply(function() {
                            callback.apply(socket, args);
                        });
                    }
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args;
                    args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }
]);