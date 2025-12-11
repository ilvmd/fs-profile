app.controller("ProjectCtrl", function ($scope, $http, $routeParams) {
    $http.get("profile.json")
        .then(function (response) {
            $scope.project = response.data.projects.find(pj => pj.id == $routeParams.id);
        });
});
