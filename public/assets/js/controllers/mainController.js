greenchat.controller('greenchatCtrl', function($rootScope, $scope, socket, $firebaseArray) {
    var ref = new Firebase("https://greenchat.firebaseio.com/");
    $scope.data = $firebaseArray(ref);
    ref.on("value", function(snapshot) {
        $scope.data = snapshot.val();
    });

    $scope.currentUserName = prompt('What is your name?');

    (function($) {})(jQuery);
});
