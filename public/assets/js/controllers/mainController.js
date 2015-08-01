greenchat.controller('greenchatCtrl', function($rootScope, $scope, socket, $firebaseArray) {
    var ref = new Firebase("https://greenchat.firebaseio.com/");
    $scope.data = $firebaseArray(ref);
    ref.on("value", function(snapshot) {
        $scope.$apply(function() {
            $scope.data = snapshot.val();
        });
    });


    $scope.collection = [];
    $scope.selectedIndex = 0;
    $scope.itemClicked = function($index) {
        console.log($index);
        $scope.selectedIndex = $index;
    };

    socket.on('updatechat', function(username) {
        return console.log(username);
    });

    socket.on('updaterooms', function(rooms, current_room) {
        console.log(rooms);
        return console.log(current_room);
    });

    $('.button').click(function() {
        var myQuestion, question;

        myQuestion = $('.message-input > span input').val();
        socket.emit('renderChatList', myQuestion);
        socket.emit('question');
        return socket.on('newQuestion', function(data) {
            return console.log(data);
        });
    });



    (function($) {})(jQuery);
});
