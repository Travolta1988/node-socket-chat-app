greenchat.controller('roomCtrl', function ($routeParams, $rootScope, socket, $scope, $firebaseArray) {
    $scope.currentRoom = $routeParams.currentRoom;
    var ref = new Firebase("https://greenchat.firebaseio.com/rooms");
    ref.child($scope.currentRoom).on("value", function (snapshot) {
        currentRoomData = snapshot.val();
        $scope.usersInGroup = [];
        for (index in currentRoomData.messages) {
            $scope.usersInGroup.push(currentRoomData.messages[index])
        }
        $scope.roomName = currentRoomData.room_name;
        $scope.roomValue = currentRoomData.room_value;
    });

    var chatRoom = $scope.currentRoom;
    socket.emit('renderChatList', chatRoom);

    $('.button-send-message').click(function () {
        userMessage = $('#message-textarea').val();
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
        $('#message-textarea').val("");
        $(document).ready(function(){
            $("#messages-section").animate({
                scrollTop: $('#messages-section')[0].scrollHeight}, 500);
        });
        return false
    });

    // Who is typing now detect user

    var typing = false;
    var timeout = void 0;
    timeoutFunction = function() {
        typing = false;
        socket.emit('typing', false);
    };
    $('#message-textarea').keypress(function(e) {
        console.log(3434)
        if (e.which !== 13) {
            if (typing === false && $('#message-textarea').is(':focus')) {
                typing = true;
                socket.emit('typing', true);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(timeoutFunction, 4000);
            }
        }
    });
    socket.on('isTyping', function(data) {
        console.log(data);
        if (data.isTyping) {
            $('#who-is-typing').css('display', 'block');
            $('#who-is-typing').prepend('<span class="who-type" id="' + $scope.currentUserName + '"> ' + $scope.currentUserName + '</span>');
            timeout = setTimeout(timeoutFunction, 5000);
        } else {
            $('span#' + $scope.currentUserName + '').remove();
            $('#who-is-typing').css('display', 'none');
        }
    });
});
