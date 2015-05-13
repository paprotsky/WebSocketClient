var nameApp = angular.module('webSocketClientApp', ['ngRoute']);

nameApp.factory('messageStore', function() {
    var messages = []
    function addMessage(message) {
        messages.push(message);
    }
    function getMessages() {
        return messages;
    }

    return {
        addMessage: addMessage,
        getMessages: getMessages
    }
});

nameApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/sendMessage', {
            templateUrl: 'templates/sendMessage.html',
            controller: 'SendMessageCtrl'
        }).
        when('/showMessages', {
            templateUrl: 'templates/showMessages.html',
            controller: 'ShowMessagesCtrl'
        }).
        otherwise({
            redirectTo: '/sendMessage'
        });
    }]);

nameApp.controller('SendMessageCtrl', function($scope, messageStore){
    $scope.sendMessage = function(){
        var exampleSocket = new WebSocket("ws://localhost:8080/api/v1/ws");
        
        exampleSocket.onopen = function (event) {
            exampleSocket.send("hello");
            exampleSocket.onmessage = function (event) {
            console.log(event.data);
            } 
        }; 

        messageStore.addMessage($scope.enteredMessage);
        $scope.enteredMessage = '';
    };
});

nameApp.controller('ShowMessagesCtrl', function($scope, messageStore) {
    if (!$.isEmptyObject(messageStore.getMessages())){   
        $scope.messages = messageStore.getMessages();
    }
});



