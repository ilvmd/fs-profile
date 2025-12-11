app.controller("SkillsCtrl", function ($scope, $http) {
    $http.get("profile.json")
        .then(function (response) {
            $scope.skills = response.data.skills;
        });
});
