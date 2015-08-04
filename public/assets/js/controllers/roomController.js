greenchat.controller('roomCtrl', function ($routeParams, $rootScope, socket, $scope, $firebaseArray) {
    $scope.currentRoom = $routeParams.currentRoom;
    var ref = new Firebase("https://greenchat.firebaseio.com/rooms");
    ref.child($scope.currentRoom).on("value", function (snapshot) {
        currentRoomData = snapshot.val();
        $scope.usersInGroup = [];
        for (index in currentRoomData.messages) {
            $scope.usersInGroup.push(currentRoomData.messages[index])
        }
        console.log($scope.usersInGroup);
        $scope.roomName = currentRoomData.room_name;
        $scope.roomValue = currentRoomData.room_value;
    });

    var chatRoom = $scope.currentRoom;
    socket.emit('renderChatList', chatRoom);

    $('.button-send-message').click(function () {
        userMessage = $('#message-textarea').val();

        console.log(userMessage);

        // Updating data when click sent button
        var messageRef = ref.child($scope.currentRoom);
        messageRef.child('messages').push([
            {
                "userMessage": {
                    "username": $scope.currentUserName,
                    "message_text": userMessage
                }
            }
        ]);
        //this is link so return false
        return false
    });

});
