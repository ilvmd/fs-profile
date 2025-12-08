app.controller("SkillsCtrl", function ($scope, $http) {
    $http.get("profile-charts.json")
        .then(function (response) {
            $scope.skills = response.data.skills;
        });
});
