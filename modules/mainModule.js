var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://greenchat.firebaseio.com/");

myFirebaseRef.on("value", function(snapshot) {
    console.log(snapshot.val());
});



var mainModule = function(server) {
    var io                  = require('socket.io').listen(server);
    var questions = {};
    var rooms = ['generalRoom'];

    io.on('connection', function (socket) {

        //User Message Model
        var ChatMessageModel = function(userWhoAsked, message){
            this.userWhoAsked = userWhoAsked;
            this.message = message;
        };

        socket.on('renderChatList', function (question) {
            console.log(question);
            socket.question = question;
            socket.room = 'generalRoom';
            questions[question] = question;
            socket.join('generalRoom');
            socket.emit('updatechat', 'SERVER', 'have asked to generalRoom');

            socket.broadcast.to('generalRoom').emit('updatechat', questions);
            socket.emit('updaterooms', rooms, 'generalRoom');

        });
    });



    };
module.exports = mainModule;