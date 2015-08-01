greenchat.controller('roomCtrl', function($routeParams, $rootScope, $scope, $firebaseArray) {
    $scope.currentRoom = $routeParams.room;

    var ref = new Firebase("https://greenchat.firebaseio.com/");
    $scope.data = $firebaseArray(ref);
    ref.on("value", function(snapshot) {
        if (!$scope.$$phase){
            $scope.$apply(function() {
                $scope.data = snapshot.val();

                console.log($scope.data);
                for (i=0;i<$scope.data.rooms.length;i++){
                    console.log(44444444444)
                }
            });
        }
    });
});
