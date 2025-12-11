app.controller("FieldServiceCtrl", function ($scope, $http) {
    $http.get("features.json")
        .then(function (response) {
            $scope.module = response.data.modules.find(m => m.categoryid == 2);
        });
});


