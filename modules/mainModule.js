//var Firebase = require("firebase");
//var myFirebaseRef = new Firebase("https://greenchat.firebaseio.com/");
//
//myFirebaseRef.on("value", function(snapshot) {
//    console.log(snapshot.val());
//});
//

var mainModule = function(server) {
    var io                  = require('socket.io').listen(server);
    var questions = {};
    var rooms = ['generalRoom'];

    io.on('connection', function (socket) {
        socket.on('renderChatList', function (room) {
            console.log(room);
            socket.room = room;
            socket.join(room);
        });
    });



    };
module.exports = mainModule;