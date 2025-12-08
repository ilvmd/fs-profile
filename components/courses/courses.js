app.controller("CoursesCtrl", function ($scope, $http) {
    $http.get("profile-charts.json")
        .then(function (response) {
            $scope.courses = response.data.courses;
        });
});
