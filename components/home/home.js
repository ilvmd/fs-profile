app.controller("HomeCtrl", function ($scope, $http) {
    $http.get("profile.json")
        .then(function (response) {
            Object.assign($scope, response.data);
        });
});
